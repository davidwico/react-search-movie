import React from 'react';
import './Modal.css';

const Modal = (props) => {
    let style = {
        visibility: props.modal,
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(168, 153, 153, 0.589)'
    }
    
    const movieDetail = props.movieDetail;

    //Genres
    const genresArray = [];
    if (movieDetail !== undefined) {
        let referenceTo = movieDetail.genres;
        let element = undefined;
        referenceTo.map((text, index) => {
            if (index === referenceTo.length - 1) {
                element = text.name;
                return genresArray.push(element)
            } else {
                element = text.name + ', ';
                return genresArray.push(element)
            }
        });
    }

    //Production countries
    const prodCountriesArray = [];
    if (movieDetail !== undefined) {
        let referenceTo = movieDetail.production_countries;
        let element = undefined;
        referenceTo.map((text, index) => {
            if (index === referenceTo.length - 1) {
                element = text.name;
                return prodCountriesArray.push(element)
            } else {
                element = text.name + ', ';
                return prodCountriesArray.push(element)
            }
        });
    }

    //Production companies
    const prodCompaniesArray = [];
    if (movieDetail !== undefined) {
        let referenceTo = movieDetail.production_companies;
        let element = undefined;
        referenceTo.map((text, index) => {
            if (index === referenceTo.length - 1) {
                element = text.name;
                return prodCompaniesArray.push(element)
            } else {
                element = text.name + ', ';
                return prodCompaniesArray.push(element)
            }
        });
    }
     

    return (
        <div style={style} className="modal" onClick={props.closeModal}>
        {movieDetail !== undefined ?
            (
                <div className="modal-info mui-panel">
                    <p className="modal-text">
                        <span className="modal-text-bold">Genre:</span> {genresArray}
                    </p>
                    <a className="modal-link" 
                        href={'http://www.imdb.com/title/'+movieDetail.imdb_id}>Link to movie at IMDB.com
                    </a>
                    <p className="modal-text modal-overview-text">
                        <span className="modal-text-bold">Description:</span> {movieDetail.overview}
                    </p>
                    <p className="modal-text">
                        <span className="modal-text-bold">Production country:</span> {prodCountriesArray}
                    </p>
                    <p className="modal-text">
                        <span className="modal-text-bold">Production companies:</span> {prodCompaniesArray}
                    </p>
                </div>
            ) :
            null
        }
        </div>
    )
}

export default Modal;