const marioModel = require('../models/defaultDB');
const fs = require('fs');

const control = {};

control.greet = (req, res)=>{
    res.send("hola desde controladores");
};

/** Insertar nuevo registro */
control.newMario = async (req, res)=>{
    let body = req.files;
    let image = body.image;
    let index = await marioModel.find({});
    let info = image.name.toString().split(',');
    let format = info[3].slice(info[3].lastIndexOf('.'),info[3].length);
    let imageName = (index.length+1)+info[0]+format;
    let path = './public/uploads/'+imageName;
    let model = new marioModel({
        name:info[0],
        power:info[1],
        life:info[2],
        document:imageName
    })
    model.save()
    .then(data=>{
        image.mv(path)
        return res.status(200).json({
            ok:true,
            message:'archivo guardado',
            la:imageName
        })
    })
    .catch(err=>{
        return res.send(err);
    })
};

/** Mostrar registros almacenados en la base de datos */
control.listMario = (req, res)=>{
    marioModel.find({}).sort({_id: -1}).exec((err, Projects)=>{// sort sirve para traer los ultimos registros insertados
        if(err){
            res.send(err);
        }else{
            res.send(Projects);
        }
    });
};

/** Buscar registro  */
control.findChar = (req, res)=>{
    marioModel.findById(
        {
            _id: req.params.id
        }
    ).exec((err, char)=>{
        if(err){
            return res.send(err)
        }else{
            return res.status(200).json(
                {
                    char
                }
            )
        }
    })
}

/** Actulizar registros por ID*/
control.upWorld = (req, res)=>{
    const updateWorld = {
        name: req.body.name,
        power: req.body.power,
        life: req.body.life
    };
    marioModel.findOneAndUpdate(
        {
            _id: req.body.id
        },
        updateWorld, {new: true}, (err, world)=>{
            if(err){
                return res.status(400).json(
                    {
                        success: false,
                        message: "could not update"
                    }
                );
            }else{
                return res.status(200).json(
                    {
                        status: true,
                        message: "Successfully updated",
                        world
                    }
                );
            }
        }
    );
};

/** Borrar registro por ID en la base de datos */
control.delWorld = (req, res)=>{
    let info = req.body.i;
    let id = info._id;
    let file =info.document;
    let path = './public/uploads/'+file;

    marioModel.deleteOne({_id:id})
    .then(data=>{
        try {
            fs.unlink(path, (err)=>{});
        } catch (error) {
            return res.send(error);
        }
        return res.status(200).json({
            ok:true,
            message:'Personaje eliminado'
        })
    })
    .catch(err=>{
        return res.status(400).json({
            ok:false,
            message:err
        })
    })
};

module.exports = control;