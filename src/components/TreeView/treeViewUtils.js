const ITEM_ARRAY_MAX_RENDER_SIZE = 3;

/**
 * Transforms obj Object into an Object formatted to be consumed by TreeView Component
 * @param {Object} obj 
 * @returns {Object}
 *  Sample
 *      Input
 *          {
 *              geolocation: {
 *                  coords: null
 *              },
 *              user: {
 *                  logged: true
 *              },
 *              flag: 1
 *          };
 *      Output
 *          {
 *              geolocation: {
 *                  label: 'geolocation',
 *                  index: 0,
 *                  nodes: {
 *                      coords: {
 *                          label: 'coords',
 *                          index: 0,
 *                          value: null
 *                      }
 *                  }
 *              },
 *              user: {
 *                  label: 'user',
 *                  index: 1,
 *                  nodes: {
 *                      logged: {
 *                          label: 'logged',
 *                          index: 0,
 *                          value: true
 *                      }
 *                  }
 *              },
 *              flag: {
 *                  label: 'flag',
 *                  index: 2,
 *                  value: 1
 *              }
 *          }
 */
export const objectToTreeViewDataObject = (obj) => {

    let count = 0;
    let tvdObj = {};

    for (let propName in obj) {

        const propValue = obj[propName];

        tvdObj[propName] = {
            label: propName,
            index: count++
        };

        if (isObject(propValue)) {
            tvdObj[propName].nodes = objectToTreeViewDataObject(propValue);
        } else {
            tvdObj[propName].value = propValue;
        }
        
    }

    return tvdObj;
  
};

export const isObject = v => {
    return Object.prototype.toString.call(v) === '[object Object]';
}

export const isArray = v => {
    return Object.prototype.toString.call(v) === '[object Array]';
}

/**
 * Formats v value to be rendered a into the TreeViewItem Component
 *  a) If v is Array, reformats it (take only the last ITEM_ARRAY_MAX_RENDER_SIZE items)
 *  b) Else, leaves it as it is
 * @param {*} v 
 */
export const treeViewItemValueForRender = (v, options = {}) => {
    if (isArray(v)) {
        const maxItemsNum = options.maxItemsNum || ITEM_ARRAY_MAX_RENDER_SIZE;
        const arraySize = v.length;
        const suspension = (arraySize > maxItemsNum) ? '...' : '';
        let cropInfo = '';
        if (arraySize > maxItemsNum) {
            cropInfo = `...(${ maxItemsNum }/${ arraySize})...`;
        }
        v = [...v]
            .reverse()
            .slice(0, maxItemsNum);
        v = JSON.stringify(v) + cropInfo;//suspension + `(${ maxItemsNum }/${ arraySize})` + suspension;
    }
    return v;
};