export default {
    'position': { // key
        label: 'Position',
        index: 0,
        //..., // any other props you need
        nodes: {
            'latitude': {
                label: 'Latitude',
                index: 0,
                value: 54.666
            },
            'longitude': {
                label: 'Longitude',
                index: 1,
                value: 33.333,
            },
        },
    },
    'time': {
        label: 'Time',
        index: 1,
        //..., // any other props you need
        nodes: {
            'start': {
                label: 'Start',
                index: 0,
                value: '11:00'
            },
            'end': {
                label: 'End',
                index: 1,
                value: '---',
            },
        },
    },
    'altitude': { // key
        label: 'Altitude',
        index: 2,
        value: 135,
        nodes: {
            'a': {
                label: 'a',
                index: 0,
                value: '10'
            },
            'b': {
                label: 'b',
                index: 1,
                value: '20',
                nodes: {
                    'tavola': {
                        label: 'tavola',
                        index: 0
                    },
                    'vela': {
                        label: 'vela',
                        index: 1
                    }
                }
            },
            'c': {
                label: 'c',
                index: 2,
                value: '30',
            },
            'd': {
                label: 'd',
                index: 3,
                value: '40',
            },
        },
    },
};