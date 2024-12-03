import React from 'react';
import PropTypes from 'prop-types'
import SaveAction from './actions/SaveAction';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

class InputNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: ''
        };

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSaveHandler = this.onSaveHandler.bind(this);
    }

    onTitleChangeHandler(e){
        this.setState(() => {
            return{
                title: e.target.value,
            }
        });
    }

    onBodyChangeHandler(e){
        this.setState(() => {
            return{
                body: e.target.innerHTML,
            }
        });
    }

    onSaveHandler(){
        const {title,body} = this.state;
        addNote({title, body});
        this.props.navigate('/');
    }

    render(){
        return(
            <LocaleContext.Consumer>
                {({locale}) => (
                <section className='add-new-page'>
                    <div className='add-new-page__input'>
                        <input className='add-new-page__input__title'
                        type='text'
                        placeholder= {locale === 'id' ? 'Judul catatan ...' : 'Note title ...'}
                        value={this.state.title}
                        onChange={this.onTitleChangeHandler}/>

                        <div className='add-new-page__input__body'
                        data-placeholder= {locale === 'id' ? 'Masukkan Catatan ...' : 'Insert note ...'}
                        value={this.state.body}
                        contentEditable
                        onInput={this.onBodyChangeHandler}>
                        </div>

                        <SaveAction onSaveHandler={this.onSaveHandler}/>
                    </div>
                </section>
                )}
            </LocaleContext.Consumer>
        );
    }
}

InputNote.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    onTitleChangeHandler: PropTypes.func,
    onBodyChangeHandler: PropTypes.func,
    onSaveHandler: PropTypes.func
}

const AddNote = (props) => {
    const navigate = useNavigate();
    return(
        <InputNote {...props} navigate={navigate}/>
    );
}

AddNote.propTypes = {
    addNote : PropTypes.func.isRequired
}



export default AddNote;