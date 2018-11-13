import React from 'react'; 
import Title from '../components/text/Title';
import Section from '../components/section/Section';
import TextInput from '../components/input/Text';
import Button from '../components/button/Button';
import DatePicker from '../components/input/DatePicker';
import TimeRange from '../components/input/TimeRange';
import Header from '../components/header';
import moment from 'moment';

export default class CreateTrip extends React.Component {
    render()
    {
        return(
            <div>
                <Header/>
                <div className="container">
                    <Title text="Create an Event" />
                    <Section title="Event Name">
                        <TextInput name = "eventName" onChange={(name, value) => console.log(name, value)} />
                    </Section>

                    <Section title="Event Date">
                        <DatePicker name="eventDate" 
                            defaultValue = {moment()}
                         onChange={(name, value) => console.log(name, value)}
                        />  
                    </Section>

                    <Section title="Event Time">
                        <TimeRange name="eventTimeRange" 
                            defaultEndTime={moment()}   
                            defaultStartTime={moment()} 
                            onChange={(name, start, end) => console.log(name, start, end)}
                        />
                    </Section>

                    <Section title="Event Location">
                        <TextInput name = "eventLocation" onChange={(name, value) => console.log(name, value)} />
                    </Section>

                    <Section title="Event Cost">
                        <TextInput name = "eventCost" onChange={(name, value) => console.log(name, value)} />
                    </Section>
                    <div className="create-button">
                        <Button blue label="Create"/>
                    </div>
                    <div className="cancel-button">
                    <Button grey label="Cancel"/>
                    </div>
                </div>
            </div>
        );
    }
}