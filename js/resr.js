window['Resr'] = (() => {
    'use strict';

    const Resr = {};

    Resr.state = {
        view: {
            body: {
                children: {
                    main: {
                        tagName: 'main',
                        className: 'app',
                        children: {
                            horizontalSliderWrapper: {
                                tagName: 'div',
                                className: 'slider-wrapper',
                                children: {
                                    horizontalSlider: {
                                        tagName: 'slider-component',
                                        className: 'slider',
                                        id: 'horizontal-slider',
                                        controlledBy: 'horizontal-slider-input',
                                        attributes: {
                                            sliderValue: {
                                                name: 'value',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'horizontal', 'value'],
                                            },
                                            sliderMinValue: {
                                                name: 'minvalue',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'horizontal', 'minValue'],
                                            },
                                            sliderMaxValue: {
                                                name: 'maxvalue',
                                                dataType: 'number',
                                                defaultValue: 100,
                                                stateDataPath: ['sliders', 'horizontal', 'maxValue'],
                                            },
                                            sliderPageSize: {
                                                name: 'pagesize',
                                                dataType: 'number',
                                                defaultValue: 10,
                                                stateDataPath: ['sliders', 'horizontal', 'pageSize'],
                                            },
                                            sliderLabelText: {
                                                name: 'label',
                                                dataType: 'string',
                                                defaultValue: 'Label',
                                                stateDataPath: ['sliders', 'horizontal', 'labelText'],
                                            },
                                            sliderOrientation: {
                                                name: 'orientation',
                                                dataType: 'string',
                                                defaultValue: '',
                                                stateDataPath: ['sliders', 'horizontal', 'orientation'],
                                            }
                                        },
                                    },
                                    horizontalSliderValueInput: {
                                        tagName: 'input',
                                        className: 'slider__input',
                                        id: 'horizontal-slider-input',
                                        controlledBy: 'horizontal-slider',
                                        attributes: {
                                            inputType: {
                                                name: 'type',
                                                dataType: 'string',
                                                defaultValue: 'number',
                                                stateDataPath: ['sliders', 'horizontal', 'input', 'type'],
                                            },
                                            inputSize: {
                                                name: 'size',
                                                dataType: 'number',
                                                defaultValue: 3,
                                                stateDataPath: ['sliders', 'horizontal', 'input', 'size'],
                                            },
                                            inputMin: {
                                                name: 'min',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'horizontal', 'input', 'min'],
                                            },
                                            inputMax: {
                                                name: 'max',
                                                dataType: 'number',
                                                defaultValue: 100,
                                                stateDataPath: ['sliders', 'horizontal', 'input', 'max'],
                                            },
                                            inputPlaceholder: {
                                                name: 'placeholder',
                                                dataType: 'string',
                                                defaultValue: 'Enter a slider value',
                                                stateDataPath: ['sliders', 'horizontal', 'input', 'placeholder'],
                                            },
                                        },
                                    }
                                }
                            },
                            verticalSliderWrapper: {
                                tagName: 'div',
                                className: 'slider-wrapper',
                                children: {
                                    verticalSlider: {
                                        tagName: 'slider-component',
                                        className: 'slider',
                                        id: 'vertical-slider',

                                        // Wait, shouldn't this just dispatch to the state,
                                        // and then get Resred?
                                        controlledBy: 'vertical-slider-input',
                                        attributes: {
                                            sliderValue: {
                                                name: 'value',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'vertical', 'value'],
                                            },
                                            sliderMinValue: {
                                                name: 'minvalue',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'vertical', 'minValue'],
                                            },
                                            sliderMaxValue: {
                                                name: 'maxvalue',
                                                dataType: 'number',
                                                defaultValue: 100,
                                                stateDataPath: ['sliders', 'vertical', 'maxValue'],
                                            },
                                            sliderPageSize: {
                                                name: 'pagesize',
                                                dataType: 'number',
                                                defaultValue: 10,
                                                stateDataPath: ['sliders', 'vertical', 'pageSize'],
                                            },
                                            sliderLabel: {
                                                name: 'label',
                                                dataType: 'string',
                                                defaultValue: 'Label',
                                                stateDataPath: ['sliders', 'vertical', 'labelText'],
                                            },
                                            sliderOrientation: {
                                                name: 'orientation',
                                                dataType: 'string',
                                                defaultValue: 'vertical',
                                                stateDataPath: ['sliders', 'vertical', 'orientation'],
                                            },
                                        },
                                    },
                                    verticalSliderValueInput: {
                                        tagName: 'input',
                                        className: 'slider__input',
                                        id: 'vertical-slider-input',
                                        controlledBy: 'vertical-slider',
                                        attributes: {
                                            inputType: {
                                                name: 'type',
                                                dataType: 'string',
                                                defaultValue: 'number',
                                                stateDataPath: ['sliders', 'vertical', 'input', 'type'],
                                            },
                                            inputValue: {
                                                name: 'value',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'vertical', 'input', 'value'],
                                            },
                                            inputSize: {
                                                name: 'size',
                                                dataType: 'number',
                                                defaultValue: 3,
                                                stateDataPath: ['sliders', 'vertical', 'input', 'size'],
                                            },
                                            inputMin: {
                                                name: 'min',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'vertical', 'input', 'min'],
                                            },
                                            inputMax: {
                                                name: 'max',
                                                dataType: 'number',
                                                defaultValue: 100,
                                                stateDataPath: ['sliders', 'vertical', 'input', 'max'],
                                            },
                                            inputPlaceholder: {
                                                name: 'placeholder',
                                                dataType: 'string',
                                                defaultValue: 'Enter a slider value',
                                                stateDataPath: ['sliders', 'vertical', 'input', 'placeholder'],
                                            },
                                        },
                                    },
                                },
                            },
                            rotatingKnobWrapper: {
                                tagName: 'div',
                                className: 'slider-wrapper',
                                children: {
                                    rotatingKnob: {
                                        tagName: 'rotating-knob',
                                        className: 'knob',
                                        id: 'rotating-knob',
                                        controlledBy: 'rotating-knob-input',
                                        attributes: {
                                            knobValue: {
                                                name: 'value',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'knob', 'value'],
                                            },
                                            knobMinValue: {
                                                name: 'minvalue',
                                                dataType: 'number',
                                                defaultValue: 0,
                                                stateDataPath: ['sliders', 'knob', 'minvalue'],
                                            },
                                            knobMaxValue: {
                                                name: 'maxvalue',
                                                dataType: 'number',
                                                defaultValue: 100,
                                                stateDataPath: ['sliders', 'knob', 'maxvalue'],
                                            },
                                            knobPageSize: {
                                                name: 'pagesize',
                                                dataType: 'number',
                                                defaultValue: 10,
                                                stateDataPath: ['sliders', 'knob', 'pagesize'],
                                            },
                                            knobLabelText: {
                                                name: 'label',
                                                dataType: 'string',
                                                defaultValue: 'Label',
                                                stateDataPath: ['sliders', 'knob', 'labelText'],
                                            },
                                            knobOrientation: {
                                                name: 'orientation',
                                                dataType: 'string',
                                                defaultValue: '',
                                                stateDataPath: ['sliders', 'knob', 'orientation'],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        data: {
            sliders: {
                horizontal: {
                    value: 0,
                    minValue: 0,
                    maxValue: 100,
                    pageSize: 10,
                    labelText: 'Volume',
                    orientation: 'horizontal',
                    input: {
                        type: 'number',
                        value: 0,
                        minValue: 0,
                        maxValue: 100,
                        size: 3,
                        placeholder: 'Volume level',
                    },
                },
                vertical: {
                    value: 0,
                    minValue: 0,
                    maxValue: 100,
                    pageSize: 10,
                    labelText: 'Master',
                    orientation: 'vertical',
                    input: {
                        type: 'number',
                        value: 0,
                        minValue: 0,
                        maxValue: 100,
                        size: 3,
                        placeholder: 'Master volume',
                    },
                },
                knob: {
                    value: 0,
                    minValue: 0,
                    maxValue: 100,
                    pageSize: 10,
                    labelText: 'Bass',
                    orientation: '',
                    input: {
                        type: 'number',
                        value: 0,
                        size: 3,
                        minValue: 0,
                        maxValue: 100,
                        placeholder: 'Bass level',
                    },
                },
            },
        },
    };

    function createViewFromState(viewElementDefinition) {
        if (!viewElementDefinition || typeof viewElementDefinition !== 'object') {
            return null;
        }
        const {
            tagName = '',
            className = '',
            id = '',
            children = {},
            controlledBy = '',
            attributes = {},
        } = viewElementDefinition;
        if (tagName !== '') {
            const viewElement = document.createElement(tagName);
            if (className !== '') {
                viewElement.classList.add(className);
            }
            if (id !== '') {
                viewElement.setAttribute('id', id);
            }
            if (Object.keys(attributes).length > 0) {
                Object.entries(attributes).forEach(([key, value]) => {
                    const {
                        name = '',
                        defaultValue = null,
                        stateDataPath = [],
                    } = value;
                    if (name !== '') {
                        if ((stateDataPath?.length ?? 0) > 0) {
                            const stateDataValue = getNodeStateData(stateDataPath);
                            if (stateDataValue !== null) {
                                viewElement.setAttribute(name, stateDataValue);
                                return;
                            }
                        }
                        if (defaultValue !== null) {
                            viewElement.setAttribute(name, defaultValue + '');
                        } else {
                            viewElement.setAttribute(name, name);
                        }
                    }
                });
            }
            if (children && Object.keys(children).length > 0) {
                const createdChildrenElements = [];
                Object.entries(children).forEach(([key, value]) => {
                    console.log(`Creating child element ${key}`);
                    const createdChild = createViewFromState(value);
                    if (createdChild !== null) {
                        createdChildrenElements.push(createdChild);
                    }
                });
                viewElement.append(...createdChildrenElements);
            }
            return viewElement;
        }
        return null;

    }

    function getNodeStateData(stateDataPath = []) {
        const { data = {} } = Resr.state;
        const getValueAtPath = (dataNode, propPath) => {
           return dataNode?.[propPath] ?? null;
        };
        let dataNode = data;
        let dataNodeValue = null;
        for (let i = 0; i < stateDataPath?.length ?? 0; ++i) {
            dataNodeValue = getValueAtPath(dataNode, stateDataPath[i]);
            if (dataNodeValue !== null) {
                if (typeof dataNodeValue !== 'object') {
                    return dataNodeValue;
                }
            }
        }
        return null;
    }
    Resr.operations = {
        getNodeStateData,
        createViewFromState,
    };
    return Resr;
})();
