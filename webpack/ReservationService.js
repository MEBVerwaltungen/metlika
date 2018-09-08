class ReservationService {

	createReservation(reservation, success, error) {
		return fetch(
			__API__ + "/reservations",
			{
				method: 'POST',
				body: this.asJson(reservation),
				headers: {
  					'content-type': 'application/json'
  				}
			}).then(this.resourceCreated(success, error), error);
	}

	resourceCreated(success, error) {
		return function(response) {
			if(response.status === 201) {
				success(response);
			} else {
				error(response);
			}
		}
	}

	asJson(reservation) {
		var snakeCaseKeys = require('snakecase-keys')
		var check_in_date = reservation.checkIn.format('YYYY-MM-DD');
		var check_out_date = reservation.checkOut.format('YYYY-MM-DD');
		reservation = snakeCaseKeys(reservation);
		reservation.check_in = check_in_date;
		reservation.check_out = check_out_date;
		var residenceId = reservation.residence_id;
		delete reservation.residence_id;
		var data = {
			data: {
				type: 'reservation',
				attributes: reservation,
				relationships: {
					'residences': [{id: residenceId}]
				}
			}
		}
		return JSON.stringify(data);
	}

}

export default ReservationService;