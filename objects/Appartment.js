const HouseHoldAppliance = require('./HouseholdAppliance');
const MobileDevice = require('./MobileDevice');
const fs = require('fs');
const path = require('path');
class Appartment {
    constructor(pathToApplianceListFile) {
        this.pathToApplianceListFile = pathToApplianceListFile;
        this.listOfAppliances = getListOfAppliances(pathToApplianceListFile);
    }
    addAppliance(applianceType, powerConsumption, pluggedInState, name, owner) {
        let applianceToAdd;
        switch (applianceType) {
            case 'household':
                applianceToAdd = new HouseHoldAppliance(powerConsumption, pluggedInState, name);
                break;
            case 'mobile':
                applianceToAdd = new MobileDevice(powerConsumption, pluggedInState, name, owner);
                break;
            default:
                applianceToAdd = new HouseHoldAppliance(powerConsumption, pluggedInState, name);
                break;
        }
        this.listOfAppliances.push(applianceToAdd);
        fs.writeFileSync(this.pathToApplianceListFile, JSON.stringify(this.listOfAppliances), 'utf8');
    }
    findApplience(parameter, value) {
        return this.listOfAppliances.filter((element) => {return checkListElement(element, parameter, value)});
    }
    getCurrentPowerConsumption() {
        let currentPowerConsumption = 0;
        this.listOfAppliances.forEach(element => {
            if (element.pluggedInState) {
                currentPowerConsumption = currentPowerConsumption + Number(element.powerConsumption);
            }
        });
        return currentPowerConsumption;
    }
    sort(sortBy, ascendingOrDescending) {
        switch (ascendingOrDescending) {
            case 'ascending':
                this.listOfAppliances.sort((prev, next) => {return prev[sortBy] > next[sortBy]});
                break;
            case 'descending':
                this.listOfAppliances.sort((prev, next) => {return prev[sortBy] < next[sortBy]});
                break;
            default:
                this.listOfAppliances.sort((prev, next) => {return prev[sortBy] > next[sortBy]});
                break;
        }
        fs.writeFileSync(this.pathToApplianceListFile, JSON.stringify(this.listOfAppliances), 'utf8');
        return this.listOfAppliances;
    }
};

function getListOfAppliances (pathToFile) {
    fs.existsSync(pathToFile)||fs.writeFileSync(path.resolve(pathToFile), '[]', 'utf8');
    let listOfAppliances = require(path.resolve(pathToFile));
    return listOfAppliances;
};

function checkListElement(element, parameter, value) {
    return Object.entries(element).containsArray([parameter, value]);
}

Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i < this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}

module.exports = Appartment;