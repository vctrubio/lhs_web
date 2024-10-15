import React, { Component } from 'react';
import { Slider } from '@mui/material';
import { IconPrice, IconBed, IconBath, IconMeasure, IconSearch, IconPlano, IconLocation } from '@/lib/svgs'; // Example icons
import { formatPrice } from '@/lib/utils'; // Assuming formatPrice is a utility function for price formatting
import { Barrio } from '@/types/property'; // Import Barrio type
class SideBarPropComponent extends Component {
    state = {
        title: this.props.title,
        slider: this.props.slider,
        markValue: this.props.markValue,
        disabled: this.props.disabled,
        barrio: this.props.barrio || null,
        onChange: this.props.onChange,
    };

    icons = {
        Precio: <IconPrice />,
        Dormitorios: <IconBed />,
        Baños: <IconBath />,
        Metros: <IconMeasure />,
        Barrio: <IconLocation />,
        Buscador: <IconSearch />,
    };

    addMilToSlider = (value: number) => {
        const formattedValue = value.toLocaleString();
        if (this.props.title === 'Precio') {
            return `${formattedValue}M`;
        }
        return formattedValue;
    }

    getMarks = () => {
        const { slider, markValue } = this.state;
        return slider
            ? [
                { value: slider.min, label: this.addMilToSlider(slider.min) },
                { value: slider.max, label: this.addMilToSlider(slider.max) },
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

    renderDescription = () => {
        const { barrio } = this.state;
        if (barrio)
            return barrio.description;

        return 'error not found.';
    };

    render() {
        const { title, slider, markValue, disabled, onChange } = this.state;
        const icon = this.icons[title] || <IconPlano />; // Get the icon based on the title, default to IconsPlano if not found   
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
                        {this.state.barrio && <span>{this.state.barrio.name}</span>} {/* Display barrio name */}
                        <div>
                            {icon}
                        </div>
                    </div>
                </div>
                {slider ? (
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
                ) : this.state.barrio ? (
                    <div style={{fontSize: '1.2rem', padding: '0 4px'}}>
                        {this.renderDescription()}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default SideBarPropComponent;
