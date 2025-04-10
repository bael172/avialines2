const {Plane} = require("../db/tables")
const {Op} = require("sequelize")
const ApiError = require("../apiError")
const crypto = require('crypto')
function ETag(data){
    const hash = crypto.createHash('md5').update(data).digest('hex');
    return `"${hash}"`
}
function LastModified(){

}
class Samolet{
    async add(req,res,next){
        /*
        if(!req.file){
            
        }
        */
        const {id,serial,type,name,classes,airline,seats_number,
            entries_number, crew_member_number, luggage_capacity,
            fueltank_capacity, current_fuel_level, status
        } = req.body
        if(!id || !serial || !name || !seats_number || !entries_number){
            return next(ApiError.badRequest("Введите необходимые поля: id, serial, name, seats_number, entries_number"))
        }
        const id_exist = await Plane.findOne({where:{id}})
        const serial_exist = await Plane.findOne({where:{serial}})
        if(id_exist || serial_exist){res.status(600).send("Самолёт с таким id существует")}
        try{
            if(req.file){ //Если есть файл заполняем соотв-щие поля
                const filename = req.file.filename;
                const filepath = req.file.path;

                const plane = await Plane.create({
                    id, serial, filename, filepath, type, name, classes, airline, seats_number, entries_number,
                    crew_member_number, luggage_capacity, fueltank_capacity, current_fuel_level, status
                })
                return res.json(plane)
           }
           else { //Если нет файла, то пропускаем поля filename, filepath
                res.status(400).write('No file uploaded')
                const plane = await Plane.create({
                    id, serial, type, name, classes, airline, seats_number, entries_number,
                    crew_member_number, luggage_capacity, fueltank_capacity, current_fuel_level, status
                })
                return res.status(200).json(plane)
           }
        }
        catch(error){
            return next(ApiError.internal(error))
        }
    } 
    async update_due_id(req,res,next){
        const {id,serial,pfp,type,name,classes,airline,seats_number,
            entries_number, crew_member_number, luggage_capacity,
            fueltank_capacity, current_fuel_level, status
        } = req.body
        const due_id = await Plane.findByPk(req.params.id)
        if(!due_id) res.send("Самолёт с id=",req.params.id," не найден")
        if(req.file){
            const filename = req.file.filename;
            const filepath = req.file.path;
            try{
                await due_id.update({
                    filename, filepath, id,serial,pfp,type,name,classes,airline,seats_number,
                    entries_number, crew_member_number, luggage_capacity,
                    fueltank_capacity, current_fuel_level, status
                })
            }
            catch(error){
                return next(ApiError.internal(error))
            }
        }
        else  {
            try{
                await due_id.update({
                    id,serial,pfp,type,name,classes,airline,seats_number,
                    entries_number, crew_member_number, luggage_capacity,
                    fueltank_capacity, current_fuel_level, status
                })
            }
            catch(error){
                return next(ApiError.internal(error))
            }
        }           


        const result = await Plane.findOne({where:{id:req.params.id}})
        return res.json(result)
    }
    async update_due_serial(req,res,next){
        const {id,serial,pfp,type,name,classes,airline,seats_number,
            entries_number, crew_member_number, luggage_capacity,
            fueltank_capacity, current_fuel_level, status
        } = req.body
        const due_id = await Plane.findOne({where:{serial:req.params.serial}})
        if(!due_id) res.send("Самолёт с id=",req.params.id," не найден")
        try{
            await due_id.update({
                id,serial,pfp,type,name,classes,airline,seats_number,
                entries_number, crew_member_number, luggage_capacity,
                fueltank_capacity, current_fuel_level, status
            })
        }
        catch(error){
            return next(ApiError.internal(error))
        }
        const result = await Plane.findOne({where:{serial:req.params.serial}})
        return res.json(result)
    }
    async get_due_id(req,res,next){
        const id = req.params.id
        const result = await Plane.findByPk(id)
        if(!result) res.send("Самолёт с id=",id," не найден")
        return res.json(result)
    }
    async get_due_serial(req,res,next){
        const serial = req.params.serial
        const result = await Plane.findOne({where:{serial}})
        if(!result) res.send("Самолёт с serial=",serial," не найден")
        return res.json(result)
    }
    async get_due_name(req,res,next){
        const name = req.params.name
        const result = await Plane.findOne({where:{name}})
        if(!result) res.send("Самолёт с name=",name," не найден")
        return res.json(result)
    }
    async get_due_query_typeANDclasses(req,res,next){
        const type = req.params.type
        const classes = req.params.classes
        try{
            const result = await Plane.findAll({where:{[Op.and]:[{type},{classes}]}})
            if(!result) res.status(600).send("Ничего не найдено")
            return res.json(result)
        }
        catch(error){
            return next(ApiError.internal(error))
        }
    }
    async get_due_query_typeORnameORclasses(req,res,next){
        const type = req.params.type
        const name = req.params.name
        const classes = req.params.classes
        try{
            const result = await Plane.findAll({where:{[Op.or]:[{type},{name},{classes}]}})
            if(!result) res.status(600).send("Ничего не найдено")
            return res.json(result)
        }
        catch(error){
            return next(ApiError.internal(error))
        }
    }
        async get_all(req,res,next){
        console.log('privet')
        try{
            const all = await Plane.findAll()
            const data = JSON.stringify(all)
            const etag = ETag(data)
            //const lastModified = new Date(all.updatedAt.toUTCSyting()); //Получаем дату из базы данных
            //в итоге lastModified - массив объектов Date
            let lastModifiedDate = null;
            for (let plane of all) {
            if (plane.updatedAt) {
                const currentUpdatedAt = new Date(plane.updatedAt);
                if(isNaN(currentUpdatedAt.getTime())){
                    return next(ApiError.internal('Ошибка преобразование поля updatedAt в объект Date'))
                }
                //currentUpdatedAt - объект Date со значением последнего обновления записи Plane
                //Перебор всех записей из таблицы Plane и запись в lastModifiedDate самой последней даты обновления Plane из всех записей
                //Если текущее значение атрибута updateAt новее чем lastModifiedDate
                //поздняя дата БОЛЬШЕ чем ранняя дата
                if (lastModifiedDate===null || currentUpdatedAt > lastModifiedDate) {
                    lastModifiedDate = currentUpdatedAt;
                }
            }
            //!lastModified проверка на falsy значение (undefined,NaN,"",null,false)
            //!lastModified тоже самое что и lastModified == null
            } //Находим самую позднюю дату updatedAt
            if(lastModifiedDate){
                const lastModified = lastModifiedDate.toUTCString(); //Преобразование даты в строку
                res.setHeader('Last-Modified',lastModified);
            }

            //1 вариант кэширования
            //res.setHeader('Cache-Control','public,max-age=3600')
            
            //2 вариант кэширования
            res.setHeader('ETag',etag);

            res.setHeader('Cache-Control','no-cache') //кэшируем после проверки того что ресурс изменился
            
            //ifNoneMatch возвращает null/undefined , * или одна/несколько строк ETag
            const ifNoneMatch = req.headers['If-None-Match'];
            console.log('If-None-Match = ',ifNoneMatch);

            //Дата когда клиент в последний раз получал запрошенный ресурс
            const ifModifiedSince = req.headers['If-Modified-Since'];

            //Если значение ifNoneMatch совпадает с хэшом текущего ресурса
            if(ifNoneMatch === etag){
                res.status(304).end(); //Not Modified
            }

            //Если дата последнего запроса ресурса позднее (новее) чем самая поздняя (новая) запись таблицы Plane
            //то возвращаем значение из кэша
            if(ifModifiedSince && new Date(ifModifiedSince) >= lastModifiedDate){
                return res.status(304).end; //Not Modified
            }
            res.json(all)
        }
        catch(error){
            throw error
        }

    }
    async delete_due_id(req,res,next){
        try{
            const deletedCount = await Plane.destroy({
                where:{id:req.params.id}
            })
            if(deletedCount == 1) res.send("Самолёт успешно удалён")
            else res.send("Самолёт с id=",req.params.id," не найден")
        }
        catch(error){
            return next(ApiError.internal(error))
        }
    }
}
module.exports = new Samolet()
