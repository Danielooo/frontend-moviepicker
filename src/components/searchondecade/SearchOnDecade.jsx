/* eslint-disable no-unused-vars */

import React, { useEffect, useId } from 'react';
import Button from '../button/Button.jsx';


function SearchOnDecade( { handleDecadeSubmit, selectedDecade, setSelectedDecade, decades, errorDecade } ) {
    const idPrefix = useId();
    
    return (
        <>
            <form
                className='section-form'
                onSubmit={handleDecadeSubmit}
            >
                <div className='section-input-line'>
                    <label className='decadeInput'>Decade: </label>
                    <select
                        className='section-input-field'
                        id='DecadeInput'
                        value={selectedDecade}
                        onChange={( e ) => setSelectedDecade( e.target.value )}
                    >
                        {decades.map( ( decade ) => (
                            <option
                                key={`${idPrefix}-${decade}`}
                                value={decade}
                            >
                                {decade}
                            </option>
                        ) )}
                    </select>
                </div>
                <Button
                    type='submit'
                    text='Search Decade'
                    disabled={false}
                />
            </form>
            {errorDecade && <p className='error-message'>An error occurred. Please try again</p>}
        </>
    
    );
}

export default SearchOnDecade;