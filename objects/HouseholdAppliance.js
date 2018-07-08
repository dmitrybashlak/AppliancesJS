const BaseAppliance = require('./BaseAppliance');

class HouseholdAppliance extends BaseAppliance {
    constructor(powerConsumption, pluggedInState, name) {
        super(powerConsumption, pluggedInState);
        this.name =  name;
    }
};

module.exports = HouseholdAppliance;