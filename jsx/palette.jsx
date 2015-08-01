var Palette = {
    light: '#F8EDC1',
    lighter: '#F6E7B3',
    lightest: '#E9DB92',
    red: '#922635',
    brown: '#442905',

    //TODO: do colour math on these instead...
    new: '#CDECCC',
    newlight: '#DEFEEE',
    paused: '#EDD269',
    pausedlight: '#FEE37A',
    active: '#E88460',
    activelight: '#F99571',
    frozen: '#B1CAF0',
    frozenlight: '#C2DBFF',
    finished: '#442905',

    important: '#F23460',
    notice: '#321D2E',
    noticeFG: '#EDD269',
};

Palette.unassigned = Palette.light;
Palette.unassignedlight = Palette.lighter; //TODO: instead do colour math on light
Palette.finishedlight = Palette.finished;

module.exports = Palette;
