const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const {BookingRepository} = require('../repository/index');
const { ServerError } = require('../utils/errors/index');
const axios = require("axios");

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight`;
            console.log(getFlightURL);
            const response = await axios.get(getFlightURL,{data :{id : flightId}});
            console.log(response.data.data);
            let flightData = response.data.data;
            let priceOfFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServerError("Something went wrong in Booking", "Insufficient seats in flight");
            }
            const totalCost = data.noOfSeats * priceOfFlight;
            const updatedData = {...data,totalCost};
            const booking = await this.bookingRepository.create(updatedData);
            const updatedFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            await axios.patch(updatedFlightRequestURL,{totalSeats : flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id,{status : "Booked"});
            return finalBooking;
        } catch (error) {
            
            throw new ServerError(error);
        }
    }
}

module.exports = BookingService;