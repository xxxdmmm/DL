import torch
from torch import nn
import torch.nn.functional as F


class ConvBNRelu(nn.Module):  # 特征图输入与输出维度保持不变 H*W--->H*W
    def __init__(self, in_ch: int, out_ch: int, kernel_size: int = 3, stride: int = 1, dilation: int = 1):
        super().__init__()
        self.padding = 1 if dilation == 1 else dilation
        self.conv = nn.Conv2d(in_channels=in_ch,
                              out_channels=out_ch,
                              kernel_size=kernel_size,
                              stride=stride,
                              dilation=dilation,
                              padding=self.padding)
        self.BN = nn.BatchNorm2d(num_features=out_ch)
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        return self.relu(self.BN(self.conv(x)))


class DownConvBNRelu(ConvBNRelu):  # H*W--->(H/2)*(W/2)
    def __init__(self, in_ch: int, out_ch: int, kernel_size: int = 3, stride: int = 1, dilation: int = 1):
        super().__init__(in_ch, out_ch, kernel_size, stride, dilation)
        self.max_pooling = nn.MaxPool2d(kernel_size=2, stride=2)

    def forward(self, x):
        return self.relu(self.BN(self.conv(self.max_pooling(x))))


class Attention(nn.Module):
    """
    目的：更新编码器到解码器的输入
    """

    def __init__(self, en_ch: int, de_ch: int, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.out = en_ch
        self.de_g_process = nn.Sequential(
            nn.Conv2d(de_ch, en_ch, kernel_size=1, stride=(1, 1), padding=0),
            nn.BatchNorm2d(en_ch)
        )

        self.en_x_process = nn.Sequential(
            nn.Conv2d(en_ch, en_ch, kernel_size=1, stride=(1, 1), padding=0),
            nn.BatchNorm2d(en_ch)
        )

        self.psi = nn.Sequential(
            nn.ReLU(inplace=True),
            nn.Conv2d(en_ch, en_ch, stride=(1, 1), kernel_size=1, padding=0),
            nn.Sigmoid()
        )

    def forward(self, en_x: torch.tensor, de_g: torch.tensor):
        """
        en_x: encoder input
        de_g: decoder input
        """
        x = self.en_x_process(en_x)
        g = self.de_g_process(
            nn.functional.interpolate(de_g, size=en_x.shape[2:], mode='bilinear', align_corners=False)
        )
        en_x = en_x * self.psi(x + g)
        return en_x


class UpConvBNRelu(ConvBNRelu):  # H*W--->2H*2W
    def __init__(self, in_ch: int, out_ch: int, kernel_size: int = 3, stride: int = 1, dilation: int = 1, flag=True):
        super().__init__(in_ch, out_ch, kernel_size, stride, dilation)
        self.flag = flag
        # self.attention = Attention(en_ch=int(in_ch / 2), de_ch=int(in_ch / 2))  #

    def forward(self, x1: torch.tensor, x2: torch.tensor):
        """
        x1: come from decoder
        x2: come from encoder
        """
        # x2 = self.attention(x2, x1)  #
        if self.flag:
            x1 = nn.functional.interpolate(x1, size=x2.shape[2:], mode='bilinear', align_corners=False)
        return self.relu(self.BN(self.conv(torch.cat([x1, x2], dim=1))))


class RSU(nn.Module):
    def __init__(self, deep: int, in_ch: int, mid_ch: int, out_ch: int):  # 当deep=7时，即为RSU7
        super().__init__()
        self.deep = deep
        self.begin = [ConvBNRelu(in_ch, out_ch), ConvBNRelu(out_ch, mid_ch)]
        self.encoder_list = [DownConvBNRelu(mid_ch, mid_ch) for i in range(self.deep - 2)]
        self.middle = ConvBNRelu(mid_ch, mid_ch, dilation=2)

        self.decoder_list = [UpConvBNRelu(mid_ch * 2, mid_ch, flag=False)]

        for i in range(deep - 3):
            self.decoder_list.append(UpConvBNRelu(mid_ch * 2, mid_ch))
        self.decoder_list.append(UpConvBNRelu(mid_ch * 2, out_ch))

        self.begin_module = nn.ModuleList(self.begin)
        self.encoder_module = nn.ModuleList(self.encoder_list)
        self.decoder_module = nn.ModuleList(self.decoder_list)

    def forward(self, x):
        begin_out = list()
        encoder_out = list()
        for i in self.begin:
            x = i(x)
            begin_out.append(x)
        for i in self.encoder_module:
            x = i(x)
            encoder_out.append(x)
        x = self.middle(x)

        begin_out.reverse()
        encoder_out.reverse()

        x1 = x

        for i, x2 in zip(self.decoder_module[0:self.deep - 2], encoder_out[0:self.deep - 2]):
            x1 = i(x1, x2)

        x = self.decoder_module[-1](x1, begin_out[0])
        return x + begin_out[-1]


class RSU4F(nn.Module):
    def __init__(self, in_ch: int, mid_ch: int, out_ch: int):  # [False, 64, 16, 64,False],
        super().__init__()

        self.encoder = [ConvBNRelu(in_ch, out_ch),
                        ConvBNRelu(out_ch, mid_ch),
                        ConvBNRelu(mid_ch, mid_ch, dilation=2),
                        ConvBNRelu(mid_ch, mid_ch, dilation=4)]

        self.middle = ConvBNRelu(mid_ch, mid_ch, dilation=8)

        self.decoder = [UpConvBNRelu(mid_ch * 2, mid_ch, dilation=4, flag=False),
                        UpConvBNRelu(mid_ch * 2, mid_ch, dilation=2, flag=False),
                        UpConvBNRelu(mid_ch * 2, out_ch, flag=False)]

        self.encoder_module = nn.ModuleList(self.encoder)
        self.decoder_module = nn.ModuleList(self.decoder)

    def forward(self, x):
        encoder_out = list()

        for i in self.encoder_module:
            x = i(x)
            encoder_out.append(x)
        encoder_out.reverse()
        x1 = self.middle(x)

        for i, x2 in zip(self.decoder_module, encoder_out[0:-1]):
            x1 = i(x1, x2)

        return x1 + encoder_out[-1]


class U2Net(nn.Module):
    def __init__(self, param: dict, out_ch: int):
        super().__init__()
        self.encoder_num = len(param['encoder'])
        self.encoder_list = list()
        self.decoder_list = list()
        self.side_list = list()
        encoder_param = param['encoder']
        decoder_param = param['decoder']
        for i in encoder_param:
            if i[0]:
                self.encoder_list.append(RSU(i[0], i[1], i[2], i[3]))
            else:
                self.encoder_list.append(RSU4F(i[1], i[2], i[3]))
            if i[-1]:
                self.side_list.append(nn.Conv2d(i[3], out_ch, kernel_size=3, padding=1))

        for i in decoder_param:
            if i[0]:
                self.decoder_list.append(RSU(i[0], i[1], i[2], i[3]))
            else:
                self.decoder_list.append(RSU4F(i[1], i[2], i[3]))
            if i[-1]:
                self.side_list.append(nn.Conv2d(i[3], out_ch, kernel_size=3, padding=1))

        self.encoder_module = nn.ModuleList(self.encoder_list)
        self.decoder_module = nn.ModuleList(self.decoder_list)
        self.side_module = nn.ModuleList(self.side_list)
        self.out_conv = nn.Conv2d(self.encoder_num * out_ch, out_ch, kernel_size=1, stride=1, padding=0)
        self.max_pooling = nn.MaxPool2d(2, 2, ceil_mode=True)
        self.attention = Attention(64, 64)  #

    def forward(self, x):
        h, w = x.shape[2:]
        encoder_out = list()
        side_out = list()
        decoder_out = list()
        for i in self.encoder_module[:-1]:
            x = i(x)
            encoder_out.append(x)
            x = self.max_pooling(x)
        x1 = self.encoder_list[-1](x)
        decoder_out.append(x1)  # 即使是属于最后一层encoder的，但是该层输出后面会产生side_out，所以该层输出放入decoder_out
        encoder_out.reverse()

        for i, x2 in zip(self.decoder_module, encoder_out):
            x2 = self.attention(x2, x1)  #
            x1 = F.interpolate(x1, size=x2.shape[2:], mode='bilinear', align_corners=False)

            x1 = i(torch.concat([x1, x2], dim=1))
            decoder_out.append(x1)  # 从下往上[en6-->de1]

        for i, j in zip(self.side_list, decoder_out):
            # out = F.interpolate(i(j), size=[h, w], mode='bilinear', align_corners=False)
            out = i(F.interpolate(j, size=[h, w], mode='bilinear', align_corners=False))
            side_out.append(out)

        x = self.out_conv(torch.concat(side_out, dim=1))

        if self.training:
            return [x] + side_out  # 训练时同时优化6个side的输出和最终的输出
        else:
            return nn.Sigmoid()(x)  # 验证或者测试的时候只需得到最终输出即可


'''
class ConvBNReLU(nn.Module):
    def __init__(self, in_ch: int, out_ch: int, kernel_size: int = 3, dilation: int = 1)
    
class DownConvBNRelu(ConvBNRelu):
    def __init__(self, in_ch: int, out_ch: int, kernel_size: int = 3, stride: int = 1, dilation: int = 1)

class UpConvBNRelu(ConvBNRelu):
    def __init__(self, in_ch: int, out_ch: int, kernel_size: int = 3, stride: int = 1, dilation: int = 1, flag=True)
    
class RSU(nn.Module):
    def __init__(self, deep: int, in_ch: int, mid_ch: int, out_ch: int)

class RSU4F(nn.Module):
    def __init__(self, in_ch: int, mid_ch: int, out_ch: int)
    
params
#          deep, in_ch, mid_ch, out_ch, have_side(if deep is False , it refers that it is RSU4F)
params = {
    "encoder": [[7, 3, 8, 32,False],
                [6, 32, 8, 32,False],
                [5, 32, 8, 32,False],
                [4, 32, 8, 32,False],
                [False, 32, 8, 32,False],
                [False, 32, 8, 32,True]],

    "decoder": [[False, 64, 8, 32,True],
                [4, 64, 8, 32,True],
                [5, 64, 8, 32,True],
                [6, 64, 8, 32,True],
                [7, 64, 8, 32,True]]
}

    params = {
        "encoder": [[7, 3, 16, 64, False],
                    [6, 64, 16, 64, False],
                    [5, 64, 16, 64, False],
                    [4, 64, 16, 64, False],
                    [False, 64, 16, 64, False],
                    [False, 64, 16, 64, True]],

        "decoder": [[False, 128, 16, 64, True],
                    [4, 128, 16, 64, True],
                    [5, 128, 16, 64, True],
                    [6, 128, 16, 64, True],
                    [7, 128, 16, 64, True]]
    }
    
        params = {
        "encoder": [[7, 3, 32, 128, False],
                    [6, 128, 32, 128, False],
                    [5, 128, 32, 128, False],
                    [4, 128, 32, 128, False],
                    [False, 128, 32, 128, False],
                    [False, 128, 32, 128, True]],

        "decoder": [[False, 256, 32, 128, True],
                    [4, 256, 32, 128, True],
                    [5, 256, 32, 128, True],
                    [6, 256, 32, 128, True],
                    [7, 256, 32, 128, True]]
    }
'''

if __name__ == '__main__':
    pass
