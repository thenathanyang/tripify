import React from 'react'; 
import Title from '../components/text/Title';
import Section from '../components/section/Section';
import TextInput from '../components/input/Text';
import Button from '../components/button/Button';
import DatePicker from '../components/input/DatePicker';
import Header from '../components/header';
import Paragraph from '../components/text/Paragraph';
import TimeRange from '../components/input/TimeRange';
import TripTile from '../components/tile/Trip';
import Subheader from '../components/text/Subheading';
import moment from 'moment';

class ViewTrip extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div>
                        <Title text="Kayaking Trip"/>
                        <div className="trip-header">
                            <Title text="$20"/>
                            <Subheader text="per person"/>
                            <div id="trip-buttons">
                                <div id="edit-trip-button">
                                    <Button small blue label="Edit"/>
                                </div>
                                <div id="delete-trip-button">
                                    <Button small red label="Delete"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Section title="Date & Time">
                        <Paragraph text="Saturday, November 17th"/>
                        <TimeRange
                            name="eventTimeRange"
                            defaultEndTime={moment()}  
                            defaultStartTime={moment()} 
                            onChange={(name, start, end) => console.log(name, start, end)}
                            disabled
                        />
                        </Section>
                    </div>

                    <div>
                        <Section title="Description">
                            <Paragraph text="Let's go kayaking at the Marina!"/>
                        </Section>
                    </div>

                    <div>
                        <Section title="Events">
                        <TripTile
                            title="Kayaking at Marina del Rey "
                            background="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRTv1vUhVksy1zgscQp28LnKkO2gryPvDvkaaVZs_zCYVGlhH6Q"
                        />
                        <Button grey label="+ Add event"/>
                        </Section>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewTrip;
