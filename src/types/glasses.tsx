import React, { Component } from 'react';
import { Slider } from '@mui/material';
import { IconPrice, IconBed, IconBath, IconMeasure, IconSearch, IconPlano, IconLocation, IconRulerMeters } from '@/lib/svgs'; // Example icons
import { formatPrice } from '@/lib/utils'; // Assuming formatPrice is a utility function for price formatting
import { Barrio } from '@/types/property'; // Import the Barrio type from the property file

interface SliderType {
    min: number;
    max: number;
    value: number;
    setValue: (value: number) => void;
    step: number;
}

interface SideBarBarrioProps {
    barrios: Barrio | Barrio[];
    selectedBarrios: Barrio | Barrio[] | null;  // Selected barrios (could be same type as barrios)
    setSelectedBarrios: ((selected: Barrio | Barrio[]) => void) | null; // Function to update selected barrios
}

interface SideBarPropComponentProps {
    title: string;
    slider?: SliderType | null; // Slider is optional
    markValue: number | null; // Or use the correct type
    disabled: boolean;
    barrio: SideBarBarrioProps; // Use the interface here for barrio
    onChange: () => void;
}


export class SideBarPropComponent extends Component<SideBarPropComponentProps> {
    state = {
        title: this.props.title,
        slider: this.props.slider || null,
        markValue: this.props.markValue,
        disabled: this.props.disabled,
        barrio: this.props.barrio,
        onChange: this.props.onChange,
    };

    icons = {
        Precio: <IconPrice />,
        Dormitorios: <IconBed />,
        Baños: <IconBath />,
        Metros: <IconRulerMeters flag={-1}/>,
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

    toggleBarrioSelection = (barrio: Barrio) => {
        const { selectedBarrios, setSelectedBarrios } = this.props.barrio;
        const isSelected = Array.isArray(selectedBarrios)
            ? selectedBarrios.some((selected) => selected.name === barrio.name)
            : selectedBarrios.name === barrio.name;

        if (isSelected) {
            setSelectedBarrios(
                Array.isArray(selectedBarrios)
                    ? selectedBarrios.filter((selected) => selected.name !== barrio.name)
                    : []
            );
        } else {
            setSelectedBarrios(
                Array.isArray(selectedBarrios) ? [...selectedBarrios, barrio] : [barrio]
            );
        }
    };

    renderDescription = () => {
        const { barrio } = this.state;
        if (barrio && barrio.barrios) {
            // Check if barrio.barrios is an object and has a description
            if (typeof barrio.barrios === 'object' && barrio.barrios.description) {
                return barrio.barrios.description || 'No description available';
            } else if (Array.isArray(barrio.barrios)) {
                // Render all barrios.name and make them clickable to toggle selectedBarrios
                return barrio.barrios.map((barrioItem, index) => {
                    const isSelected = Array.isArray(barrio.selectedBarrios)
                        ? barrio.selectedBarrios.some((selected) => selected.name === barrioItem.name)
                        : barrio.selectedBarrios && barrio.selectedBarrios.name === barrioItem.name;

                    return (
                        <div
                            key={index}
                            onClick={() => this.toggleBarrioSelection(barrioItem)}
                            style={{ textDecoration: isSelected ? '' : 'line-through', cursor: 'pointer' }}
                        >
                            {barrioItem.name}
                        </div>
                    );
                });
            }
        }
        return '...';
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
                        {this.state.barrio && (
                            <span>{this.state.barrio.barrios.name}</span>
                        )}
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
                    <div className='override-max-height flex flex-col' style={{ fontSize: '1.2rem', padding: '0 4px' }}>
                        {this.renderDescription()}
                    </div>
                ) : null}
            </div>
        );
    }
}

