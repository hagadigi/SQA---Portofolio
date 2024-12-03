import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { showFormattedDate } from '../utils';
import parser from 'html-react-parser'
import { getNote, archiveNote, unarchiveNote, deleteNote } from '../utils/network-data';
import NoteIdAction from '../components/actions/NoteIdAction';
import PropTypes from 'prop-types';
import NotFoundPage from './NotFoundPage';

function NoteIdPage(){
    const {id} = useParams();
    const navigate = useNavigate();

    return(
        <NoteIdPageWrapper navigate={navigate} id={id}/>
    );
}

class NoteIdPageWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            note: null,
            initializing: true,
        };

        this.onArchive = this.onArchive.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    async componentDidMount(){
    const {data} = await getNote(this.props.id);
    this.setState({
        note: data,
        initializing: false,
        });
    }

    async onArchive(id){
        if(this.state.note.archived){
            await unarchiveNote(id);
            this.props.navigate("/archives");
        } else{
            await archiveNote(id);
            this.props.navigate("/");
        }
    }

    async onDelete(id){
        await deleteNote(id);
        this.props.navigate("/")
    }

    render(){

        if(this.state.initializing){
            return null;
        }

        if(this.state.note){
            return(
                <section className='detail-page'>
                    <h3 className='detail-page__title'>{this.state.note.title}</h3>
                    <p className='detail-page__createdAt'>{showFormattedDate(this.state.note.createdAt)}</p>
                    <div className='detail-page__body'>{parser(this.state.note.body)}</div>
                    <NoteIdAction
                    id = {this.props.id}
                    archived = {this.state.note.archived}
                    onArchiveHandler = {this.onArchive}
                    onDeleteHandler = {this.onDelete}/>
                </section>
            );
        }
        
        return <NotFoundPage/>;
    }
}

NoteIdPageWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired
}

export default NoteIdPage;




