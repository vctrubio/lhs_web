import React, { Component } from 'react';
import { Slider } from '@mui/material';
import { IconPrice, IconBed, IconBath, IconMeasure, IconSearch } from '@/lib/svgs'; // Example icons
import { formatPrice } from '@/lib/utils'; // Assuming formatPrice is a utility function for price formatting

class SideBarPropComponent extends Component {
    state = {
        title: this.props.title,
        slider: this.props.slider,
        markValue: this.props.markValue,
        disabled: this.props.disabled,
        onChange: this.props.onChange,
    };

    icons = {
        Precio: <IconPrice />,
        Dormitorios: <IconBed />,
        Baños: <IconBath />,
        Metros: <IconMeasure />,
        Buscador: <IconSearch />,
    };

    getMarks = () => {
        const { slider, markValue } = this.state;
        return slider
            ? [
                { value: slider.min, label: slider.min.toString() },
                { value: slider.max, label: slider.max.toString() },
                ...(markValue !== null && markValue !== undefined
                    ? [{ value: markValue, label: markValue.toString() }]
                    : []),
            ]
            : [];
    };

    // Format the markValue if it's the 'Precio' section
    getFormattedMarkValue = () => {
        const { title, markValue } = this.state;
        if (title === 'Precio') {
            return formatPrice(markValue); // Apply formatting if 'Precio'
        }
        return markValue;
    };

    render() {
        const { title, slider, markValue, disabled, onChange } = this.state;
        const icon = this.icons[title]; // Get the icon based on the title
        const formattedMarkValue = this.getFormattedMarkValue(); // Get formatted markValue

        const precioValue = title === 'Precio' && markValue
            ? markValue.toLocaleString('de-DE')
            : null;

        return (
            <div className='menu'>
                <div className='px-1'>
                    <input
                        value={title}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder={disabled ? '' : 'Buscador'}
                    />
                    <div className='flex items-center'>
                        {precioValue && (
                            <span id='price-color'>
                                {precioValue}
                            </span>
                        )}
                        <div className=''>
                            {icon}
                        </div>
                    </div>
                </div>
                {slider && (
                    <div className='px-5'>
                        <Slider
                            value={formattedMarkValue ? formattedMarkValue : slider.value}
                            onChange={(e, newValue) => slider.setValue(newValue)}
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            marks={this.getMarks()}
                            disableSwap
                            valueLabelDisplay='auto'
                            disabled={disabled}
                            style={{
                                color: 'var(--color-green-dark)',
                                opacity: disabled ? 0.5 : 1,
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default SideBarPropComponent;
