const multer = require('multer')
const path = require('path')

//Multer Configuration - сохраняем файлы на сервер
const storage = multer.diskStorage({
    //Куда будет сохраняться файл
    destination: (req, file, cb) => {
        cb(null, 'uploads/') //Папка для сохранения файлов
    },
    //Генерация уникального имени файла для избежания конфликтов
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9); //Уникальный суффикс к названию файла
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); //Уникальное имя файла
    },
})

const upload = multer({storage: storage});

//Создайте папку uploads если её нет
const fs = require('fs')
const uploadsDir = path.join(__dirname, 'uploads');
if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

module.exports = upload