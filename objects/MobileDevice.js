const BaseAppliance = require('./BaseAppliance');

class MobileDevice extends BaseAppliance {
    constructor(powerConsumption, pluggedInState, name, owner) {
        super(powerConsumption, pluggedInState);
        this.name = name;
        this.owner = owner;
    }
};

module.exports = MobileDevice;