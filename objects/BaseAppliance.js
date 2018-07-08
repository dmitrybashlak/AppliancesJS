class BaseAppliance {
    constructor(powerConsumption, pluggedInState) {
        this.powerConsumption = powerConsumption;
        this.pluggedInState = pluggedInState !== 'false' ? true : false;
    }
};
module.exports = BaseAppliance;