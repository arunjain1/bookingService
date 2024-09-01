const { createChannel, publishMessage } = require("../utils/messageQueue");
const {BookingService} = require("../services/index");
const {StatusCodes} = require('http-status-codes');
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController{
    constructor(){
       
    }

    async sendMessageQueue(req,res){
       const channel = await createChannel();
       const data = {message:'Success'}
       publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
       return res.status(200).json(
        {
            message:'Successfully published message',
        }
       )
    }

    async create (req,res){
        try {
           const response = await bookingService.createBooking(req.body);
           return res
           .status(StatusCodes.OK)
           .json(
            {
                message : "Successfully completed booking",
                success : true,
                err : {},
                data : response
            }
           )
        } catch (error) {
            return res
            .status(500)
            .json(
                {
                    message : error.message,
                    success : false,
                    err : error.explaination,
                    data : {}
                }
            )
        }
    }
}
 
// const create = async(req,res)=>{
//     try {
//        const response = await bookingService.createBooking(req.body);
//        return res
//        .status(StatusCodes.OK)
//        .json(
//         {
//             message : "Successfully completed booking",
//             success : true,
//             err : {},
//             data : response
//         }
//        )
//     } catch (error) {
//         return res
//         .status(500)
//         .json(
//             {
//                 message : error.message,
//                 success : false,
//                 err : error.explaination,
//                 data : {}
//             }
//         )
//     }
// }

module.exports = 
    BookingController
