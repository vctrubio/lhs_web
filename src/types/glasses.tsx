import React, { Component } from 'react';
import { Slider } from '@mui/material';
import { IconPrice, IconBed, IconBath, IconSearch, IconPlano, IconLocation, IconRulerMeters, IconRepeatClassic } from '@/lib/svgs'; // Example icons
import { formatPrice } from '@/lib/utils'; // Assuming formatPrice is a utility function for price formatting
import { Barrio } from '@/types/property'; // Import the Barrio type from the property file

interface SliderType {
    min: number;
    max: number;
    value: number[];
    setValue: ((value: number[]) => void) | null;
    step: number;
}

interface SideBarBarrioProps {
    barrios: Barrio | Barrio[];
    selectedBarrios: Barrio | Barrio[] | null;
    setSelectedBarrios: React.Dispatch<React.SetStateAction<Barrio[]>> | null;
}

interface SideBarPropComponentProps {
    title: string;
    componentKey: string;
    slider?: SliderType | null;
    markValue: number | null;
    disabled: boolean;
    barrio?: SideBarBarrioProps | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasQueryParams: boolean; // New prop to handle query parameters
    onReset?: () => void; // New prop to handle reset
    sortOption: string;
    setSortOption: (sortOption: string) => void;
}

export class SideBarPropComponent extends Component<SideBarPropComponentProps> {
    state = {
        componentKey: this.props.componentKey,
        title: this.props.title,
        slider: this.props.slider || null,
        markValue: this.props.markValue,
        disabled: this.props.disabled,
        barrio: this.props.barrio,
        onChange: this.props.onChange,
        isIconActive: false,
    };

    icons: { [key: string]: JSX.Element } = {
        Precio: <IconPrice />,
        Dormitorios: <IconBed />,
        Baños: <IconBath />,
        Metros: <IconRulerMeters flag={-1} />,
        Barrio: <IconLocation />,
        Buscador: <IconSearch />,
        Reset: <IconRepeatClassic />,
    };

    addMilToSlider = (value: number) => {
        const formattedValue = value.toLocaleString();
        return this.props.title === 'Precio' ? `${formattedValue}M` : formattedValue;
    }

    getMarks = () => {
        const { slider, markValue } = this.state;
        if (!slider) return [];

        const marks = [
            { value: slider.min, label: this.addMilToSlider(slider.min) },
            { value: slider.max, label: this.addMilToSlider(slider.max) },
        ];

        if (markValue !== null && markValue !== undefined) {
            marks.push({ value: markValue, label: markValue.toString() });
        }

        return marks;
    };

    getFormattedMarkValue = () => {
        const { title, markValue } = this.state;
        return title === 'Precio' && markValue !== null ? formatPrice(markValue) : markValue;
    };

    toggleBarrioSelection = (barrio: Barrio) => {
        const { barrio: barrioProps } = this.props;
        if (!barrioProps || !barrioProps.setSelectedBarrios) return;

        const { selectedBarrios, setSelectedBarrios } = barrioProps;
        const isSelected = Array.isArray(selectedBarrios)
            ? selectedBarrios.some((selected) => selected.name === barrio.name)
            : selectedBarrios?.name === barrio.name;

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
        if (!barrio || !barrio.barrios) return '...';

        if (Array.isArray(barrio.barrios)) {
            return barrio.barrios.map((barrioItem, index) => {
                const isSelected = Array.isArray(barrio.selectedBarrios)
                    ? barrio.selectedBarrios.some((selected) => selected.name === barrioItem.name)
                    : barrio.selectedBarrios?.name === barrioItem.name;

                return (
                    <div
                        key={`barrio-${index}`}
                        onClick={() => this.toggleBarrioSelection(barrioItem)}
                        style={{ textDecoration: isSelected ? '' : 'line-through', cursor: 'pointer' }}
                    >
                        {barrioItem.name}
                    </div>
                );
            });
        }

        return barrio.barrios.description || 'No description available';
    };

    handleIconClick = () => {
        const { componentKey, sortOption, setSortOption, onReset } = this.props;

        if (componentKey === 'search') {
            // Trigger handleReset for the search component
            if (onReset) {
                onReset();
            }
        } else {
            // Handle sorting for other components
            const sortKeyMap: { [key: string]: string } = {
                price: 'price',
                bedrooms: 'bedrooms',
                bathrooms: 'bathrooms',
                meters: 'meters',
                neighborhood: 'barrio',
            };

            const sortKey = sortKeyMap[componentKey];

            if (sortKey) {
                const isAsc = sortOption === `${sortKey}Asc`;
                const newSortOption = isAsc ? `${sortKey}Desc` : `${sortKey}Asc`;
                setSortOption(newSortOption);
            }
        }

        this.setState(prevState => ({ isIconActive: !prevState.isIconActive }));
    };

    render() {
        const { componentKey, title, slider, markValue, disabled, onChange } = this.state;
        const { hasQueryParams } = this.props;

        let icon;
        if (componentKey === 'title') {
            icon = <IconPlano />;
        } else if (componentKey === 'search') {
            icon = hasQueryParams ? <IconRepeatClassic /> : <IconSearch />;
        } else {
            icon = this.icons[title];
        }

        const formattedMarkValue = this.getFormattedMarkValue();

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
                        {this.state.barrio && this.state.barrio.barrios && !Array.isArray(this.state.barrio.barrios) && (
                            <span>{this.state.barrio.barrios.name}</span>
                        )}
                        <div
                            onClick={this.handleIconClick}
                            style={{ fill: this.state.isIconActive ? 'red' : 'black' }}
                        >
                            {icon}
                        </div>
                    </div>
                </div>
                {slider ? (
                    <div className='px-5'>
                        <Slider
                            value={formattedMarkValue !== null ? formattedMarkValue : slider.value}
                            onChange={(e, newValue) => slider.setValue && slider.setValue(newValue as number[])}
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
