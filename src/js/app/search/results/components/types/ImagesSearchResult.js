import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import {log} from '../../../../../utils/Logger';
import {LoggerEventTypes} from '../../../../../utils/LoggerEventTypes';

////

const ImagesSearchResult = function({searchState, serpId, result, metadata, bookmarkButton, urlClickHandler}) {
    let metaInfo = {
        url: result.url,
        query: searchState.query,
        page: searchState.page,
        vertical: 'images',
        serpId: serpId,
    };

    let clickUrl = () => {
        urlClickHandler(result.url);
        log(LoggerEventTypes.SEARCHRESULT_CLICK_URL, metaInfo);
    };

    let viewUrl = (isVisible) => {
        const metaInfoView = {metaInfo, isVisible: isVisible};
        log(LoggerEventTypes.SEARCHRESULT_VIEW_URL, metaInfoView);
    };

    let contextUrl = () => {
        log(LoggerEventTypes.SEARCHRESULT_CONTEXT_URL, metaInfo);
    };

    let hoverEnter = () => {
        log(LoggerEventTypes.SEARCHRESULT_HOVERENTER, metaInfo);
    };

    let hoverLeave = () => {
        log(LoggerEventTypes.SEARCHRESULT_HOVERLEAVE, metaInfo);
    };

    ////

    return (
        <div className="result-image">
            <VisibilitySensor onChange={viewUrl}
                scrollCheck
                delayedCall={true}
                scrollThrottle={50}
                intervalDelay={2000}
            />

            {bookmarkButton}

            <a title={result.name} target="_blank" onClick={clickUrl} onContextMenu={contextUrl} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                <div className="image" style={{backgroundImage: `url(${result.thumbnailUrl})`}}/>
            </a>

            {metadata}
        </div>
    )
};

export default ImagesSearchResult;