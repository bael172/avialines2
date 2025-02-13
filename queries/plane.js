const {Plane} = require("../db/tables")
const {Op} = require("sequelize")
const ApiError = require("../apiError")
class Samolet{
    async add(req,res,next){
        const {id,serial,pfp,type,name,classes,airline,seats_number,
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
            const plane = await Plane.create({
                id, serial, pfp, type, name, classes, airline, seats_number, entries_number,
                crew_member_number, luggage_capacity, fueltank_capacity, current_fuel_level, status
            })
            return res.json(plane)
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
        const all = await Plane.findAll()
        res.json(all)
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