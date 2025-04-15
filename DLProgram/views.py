from django.shortcuts import render, HttpResponse, redirect
from DLProgram.model import predict_U2, predict_U, predict_ResU, predict_AttU2
from DLProgram.model.U2_net import U2Net
from DLProgram.model.U_net import UNet
from DLProgram.model.ResU_net import ResUnet
from DLProgram.model.AttU2_net import AttU2Net
import base64
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from io import BytesIO
from torchvision import transforms
from DLProgram.models import UserDL


# Create your views here.


@csrf_exempt
def AttU2(request):
    if not request.session.get('name'):
        return redirect('/login')
    if request.method == "GET":
        return render(request, 'DL/AttU2.html')
    if request.method == "POST":
        img_data = base64.b64decode(request.POST.get("image_data"))
        image = Image.open(BytesIO(img_data))
        result = get_result_U2(image)
        return HttpResponse(result)


@csrf_exempt
def U(request):
    if not request.session.get('name'):
        return redirect('/login')
    if request.method == "GET":
        return render(request, 'DL/U.html')
    if request.method == "POST":
        img_data = base64.b64decode(request.POST.get("image_data"))
        image = Image.open(BytesIO(img_data))
        result = get_result_U(image)
        return HttpResponse(result)


@csrf_exempt
def ResU(request):
    if not request.session.get('name'):
        return redirect('/login')
    if request.method == "GET":
        return render(request, 'DL/ResU.html')
    if request.method == "POST":
        img_data = base64.b64decode(request.POST.get("image_data"))
        image = Image.open(BytesIO(img_data))
        result = get_result_ResU(image)
        return HttpResponse(result)


@csrf_exempt
def U2(request):
    if not request.session.get('name'):
        return redirect('/login')
    if request.method == "GET":
        return render(request, 'DL/U2.html')
    if request.method == "POST":
        img_data = base64.b64decode(request.POST.get("image_data"))
        image = Image.open(BytesIO(img_data))
        result = get_result_U2(image)
        return HttpResponse(result)


def get_result_U2(img):
    image_init = transforms.Resize((224, 224))(img)
    image_init = image_init.convert('RGBA')

    img = transforms.ToTensor()(img)
    u2_net = U2Net(predict_U2.get_params(), 1)
    model_init = predict_U2.Predict(img, u2_net, "DLProgram/model/U2_net.pth")
    bytes_result = model_init.get_result(0.5)
    bytes_result = bytes_result.convert('RGBA')
    print(bytes_result.size)
    bytes_result = Image.blend(image_init, bytes_result, 0.3)

    image_data = BytesIO()
    bytes_result.save(image_data, format='png')
    image_data_bytes = image_data.getvalue()
    encoded_image = base64.b64encode(image_data_bytes).decode('utf-8')
    return encoded_image


def get_result_AttU2(img):
    image_init = transforms.Resize((192, 192))(img)
    image_init = image_init.convert('RGBA')

    img = transforms.ToTensor()(img)
    u2_net = AttU2Net(predict_U2.get_params(), 1)
    model_init = predict_AttU2.Predict(img, u2_net, "DLProgram/model/AttU2.pth")
    bytes_result = model_init.get_result(0.5)
    bytes_result = bytes_result.convert('RGBA')
    print(bytes_result.size)
    bytes_result = Image.blend(image_init, bytes_result, 0.3)

    image_data = BytesIO()
    bytes_result.save(image_data, format='png')
    image_data_bytes = image_data.getvalue()
    encoded_image = base64.b64encode(image_data_bytes).decode('utf-8')
    return encoded_image


def get_result_U(img):
    image_init = transforms.Resize((192, 192))(img)
    image_init = image_init.convert('RGBA')  # 融合用的图片

    img = transforms.ToTensor()(img)
    unet = UNet()
    model_init = predict_U.Predict(img, unet, "DLProgram/model/U_net.pth")
    bytes_result = model_init.get_result(0.5)
    bytes_result = bytes_result.convert('RGBA')
    print(bytes_result.size)
    bytes_result = Image.blend(image_init, bytes_result, 0.3)

    image_data = BytesIO()
    bytes_result.save(image_data, format='png')
    image_data_bytes = image_data.getvalue()
    encoded_image = base64.b64encode(image_data_bytes).decode('utf-8')
    return encoded_image


def get_result_ResU(img):
    image_init = transforms.Resize((192, 192))(img)
    image_init = image_init.convert('RGBA')

    img = transforms.ToTensor()(img)
    res_unet = ResUnet()
    model_init = predict_ResU.Predict(img, res_unet, "DLProgram/model/ResU_net.pth")
    bytes_result = model_init.get_result(0.5)
    bytes_result = bytes_result.convert('RGBA')
    print(bytes_result.size)
    bytes_result = Image.blend(image_init, bytes_result, 0.3)
    image_data = BytesIO()
    bytes_result.save(image_data, format='png')
    image_data_bytes = image_data.getvalue()
    encoded_image = base64.b64encode(image_data_bytes).decode('utf-8')
    return encoded_image


def login(req):
    if req.session.get('name'):
        return redirect('/AttU2')
    if req.method == 'GET':
        return render(req, 'login/login.html')
    if req.method == 'POST':
        username = req.POST.get('username')
        passwd = req.POST.get('password')
        if username and passwd:
            if UserDL.objects.filter(name=username, passwd=passwd).first():
                req.session['name'] = username
                return redirect('/AttU2')
            return render(req, 'login/login.html', {"warning": "账户或密码错误!"})
        return render(req, 'login/login.html', {"warning": "请输入账户和密码!"})


def register(req):
    if req.session.get('name'):
        return redirect('/AttU2')
    if req.method == 'GET':
        return render(req, 'login/register.html')
    if req.method == 'POST':
        username = req.POST.get('username')
        passwd = req.POST.get('password')
        if username and passwd:
            if 1 <= len(username) <= 8 and 8 <= len(passwd) <= 18:
                if UserDL.objects.filter(name=username, passwd=passwd).first():
                    return render(req, 'login/register.html', {"warning": "用户名已存在!"})
                UserDL.objects.create(name=username, passwd=passwd)
                return render(req, 'login/register.html', {"js": "alert('注册成功!')"})
            return render(req, 'login/register.html',
                          {"warning": "用户名长度1~5个字符,密码长度10~18个字符"})
        return render(req, 'login/register.html', {"warning": "请输入账户和密码!"})


def red(request):
    return redirect('/login')
