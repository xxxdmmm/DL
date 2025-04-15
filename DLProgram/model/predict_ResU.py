import torch
from torchvision import transforms
from torchvision.transforms import InterpolationMode


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
        resie = transforms.Resize(size,interpolation=InterpolationMode.NEAREST, antialias=None)
        img = resie(img)
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
