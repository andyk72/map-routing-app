import { objectToTreeViewDataObject as objFormat} from './treeViewUtils';

describe('TreeView utils', () => {

    it('objectToTreeViewDataObject(obj) produces an object format suitable for the TreeView Component', () => {

        const obj = {
            geolocation: {
                coords: null
            },
            user: {
                logged: true
            },
            flag: 1
        };

        const expected = {
            geolocation: {
                label: 'geolocation',
                index: 0,
                nodes: {
                    coords: {
                        label: 'coords',
                        index: 0,
                        value: null
                    }
                }
            },
            user: {
                label: 'user',
                index: 1,
                nodes: {
                    logged: {
                        label: 'logged',
                        index: 0,
                        value: true
                    }
                }
            },
            flag: {
                label: 'flag',
                index: 2,
                value: 1
            }
        };

        const objFormatted = objFormat(obj);

        expect(objFormatted).toEqual(expected);

    });

});