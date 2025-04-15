from torchvision.transforms import InterpolationMode

from DLProgram.model.U2_net import U2Net
import torch
from torchvision import transforms
from PIL import Image
import base64


def get_params():
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

    return params


class Predict:
    def __init__(self, img: torch.tensor, model, weight):
        self.img = self.__pro_img(img, size=(192, 192))
        self.model = model
        self.weight = weight
        self.__init_model()
        self.result = None

    def __init_model(self):
        if torch.cuda.is_available():
            self.model = self.model.cuda()
        else:
            self.model = self.model
        self.model.load_state_dict(torch.load(self.weight, ))

    def __classify_pixel(self, tensor, p=0.5):
        return torch.tensor(torch.gt(tensor, p), dtype=torch.float64)

    def __pro_img(self, img, size=(192, 192)):
        norm = transforms.Normalize(mean=[0.46100628, 0.28268592, 0.38908561], std=[0.14774563, 0.14946298, 0.15795997])
        resie = transforms.Resize(size, interpolation=InterpolationMode.NEAREST, antialias=None)
        img = norm(resie(img))
        img = torch.unsqueeze(img, dim=0)
        if torch.cuda.is_available():
            img = img.cuda()
        return img

    def get_result(self, p):
        to_PIL = transforms.ToPILImage()
        self.model.eval()
        with torch.no_grad():
            self.result = self.model(self.img)
            self.result = self.__classify_pixel(self.result, p)
            self.result = torch.squeeze(self.result)
        return to_PIL(self.result)


if __name__ == '__main__':
    img = Image.open("5.png")
    img = transforms.ToTensor()(img)
    u2_net = U2Net(get_params(), out_ch=1)
    predict = Predict(img, u2_net, "lr=0.0008 p=0.5 MIoU=0.6589435935020447.pth")
    result = predict.get_result(0.5)
