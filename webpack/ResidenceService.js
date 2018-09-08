class ResidenceService {

	constructor(locale) {
		this.locale = locale;
	}

	getResidences() {
		return new Promise((resolve, reject) => {
			fetch(__API__ + "/residences").then(res => {
		        res.json().then(json => {
		        	/* TODO: Reject! */
		        	resolve(this.expandRelations(json.data, json.included));
	          	})
		    });
		});
	}

	getResidence(id) {
		return new Promise((resolve, reject) => {
			fetch(__API__ + "/residences/"+id).then(res => {
		        res.json().then(json => {
		        	/* TODO: Reject! */
		        	resolve(this.expandRelations([json.data], json.included)[0]);
	          	})
		    });
		});
	}

	getResidenceBlockedDays(id) {
		return new Promise((resolve, reject) => {
			fetch(__API__ + "/residences/"+id+"/blocked_days").then(res => {
		        res.json().then(json => {
		        	resolve(json.data.attributes.blocked_days);
	          	})
		    });
		});
	}

	getResidenceReservations(id) {
		return new Promise((resolve, reject) => {
			fetch(__API__ + "/residences/"+id+"/reservations").then(res => {
		        res.json().then(json => {
		        	resolve(json.data);
	          	})
		    });
		});
	}

	includedObject(included, type, id) {
    	return included.filter(i => i.type === type && i.id === id)[0];
  	}

  	expandRelations(residences, included) {
		return residences.map(residence => {
	    	var new_residence = this.normalizeJsonAPIObject(residence);
	      	for (var key in residence.relationships) {
	        	new_residence[key] = [];
	        	for (var relation of residence.relationships[key].data) {
	          		var relatedObject = this.includedObject(included, relation.type, relation.id);
	          		new_residence[key].push(this.normalizeJsonAPIObject(relatedObject));
	        	}
	      	}

	      	// Only keep values with correct locale
	      	new_residence.description = new_residence.descriptions.find(d => d.locale === this.locale);
	      	new_residence.agreement = new_residence.agreements.find(a => a.locale === this.locale);

	      	delete new_residence.descriptions;
	      	delete new_residence.agreements;

	      	return new_residence;
	    });
	  }

	normalizeJsonAPIObject(data) {
    	return Object.assign({id: data.id}, data.attributes);
  	}

}

export default ResidenceService;