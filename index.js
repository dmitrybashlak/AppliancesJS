const Appartment = require('./objects/Appartment');
function main() {
    const myAppartment = new Appartment('./myAppartment.json');
    const yargs = require('yargs')
    .usage(`Simple electrical appliances app\nUsage: $0 <command> <arguments>`)
    .example('$0 add -t [type] -n [name] -pc [powerConsumption] -ps [pluggedInState] -ow [owner]', 'add a new appliance')
    .example('$0 list', 'list all appliances')
    .example('$0 sort -p [parameter] -o [order type]')
    .example('$0 find -p [parameter name] -v [value]')
    .example('$0 cosumption', 'show power consumption')
    .alias({
        'n': 'name',
        'pc': 'powerConsumption',
        'ps': 'pluggedInState',
        'ow': 'owner',
        'p': 'parameter',
        'v': 'value',
        'o': 'order',
        't': 'type'
    })
    .demandCommand(1, `You didn't enter a command!`)
    .command('add', 'add a new appliance', (yargs) => {
        yargs.options('n', {demand: true, desc: 'appliance name'})
        yargs.options('pc', {demand: true, desc: 'power consumption'})
        yargs.options('ps', {demand: true, desc: 'is the appliance on?'})
        yargs.options('t', {demand: true, desc: 'appliance type (household/mobile)'})
        yargs.option('ow', {demand: false, desc: 'name of owner'});
    }, (yargs) => {
        myAppartment.addAppliance(yargs.type, yargs.powerConsumption, yargs.pluggedInState, yargs.name, yargs.owner);
    })
    .command('list', 'list all appliances', () => {
        const listOfAppliances = myAppartment.listOfAppliances;
        console.log(listOfAppliances);
    })
    .command('sort', 'sort appliances', (yargs) => {
        yargs.options('p', {demand: true, desc: 'sorting parameter'})
        yargs.options('o', {demand: false, desc: 'sorting order descending/ascending'})
    }, (yargs) => {
        const sortedArray = myAppartment.sort(yargs.parameter, yargs.order);
        console.log(sortedArray);
    })
    .command('find', 'find appliances', (yargs) => {
        yargs.options('p', {demand: true, desc: 'search parameter'})
        yargs.options('v', {demand: true, desc: 'search parameter value'})
    }, (yargs) => {
        const searchResults = myAppartment.findApplience(yargs.parameter, yargs.value);
        console.log(searchResults);
    })
    .command('consumption', 'current power consumption', () => {
        const powerConsumption = myAppartment.getCurrentPowerConsumption();
        console.log(powerConsumption);
    }).argv;    
}
main();