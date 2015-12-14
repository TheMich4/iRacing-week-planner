import React, { Component, PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import update from 'react-addons-update';
import Modal from './modal/Modal';
import Checkbox from './Checkbox';
import series from '../data/season.json';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

const groupedSeries = series.reduce((grouped, single) => {
  if (single.catid === 1) {
    return update(grouped, {oval: {$push: [single]}});
  }
  return update(grouped, {road: {$push: [single]}});
}, { oval: [], road: [] });

export default class FavouriteSeriesModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    save: PropTypes.func,
    favouriteSeries: PropTypes.array
  }

  static defaultProps = {
    onClose: () => {},
    save: () => {},
    favouriteSeries: []
  }

  setCheckboxFavourite(seriesId, e) {
    const {favouriteSeries, save} = this.props;
    const newFavorites = cloneDeep(favouriteSeries);
    const index = newFavorites.indexOf(seriesId);

    if (index === -1 && e.target.checked) {
      newFavorites.push(seriesId);
    }
    if (index !== -1 && e.target.checked === false) {
      newFavorites.splice(index, 1);
    }
    save(newFavorites);
  }

  renderCheckbox(series, index) {
    const { favouriteSeries } = this.props;
    return (
      <div className="col-xs-6" key={index}>
        <Checkbox checked={favouriteSeries.indexOf(series.seriesid) !== -1}
          onChange={this.setCheckboxFavourite.bind(this, series.seriesid)}>{fixText(series.seriesname)}</Checkbox>
      </div>
    );
  }

  render() {
    const {onClose} = this.props;
    return (
      <Modal onClose={onClose} title='Choose favorite series' doneAction={onClose}>
        <div className="container-fluid">
          <h3>Oval</h3>
          <div className="row">
            {groupedSeries.oval.map(this.renderCheckbox.bind(this))}
          </div>
          <h3>Road</h3>
          <div className="row">
            {groupedSeries.road.map(this.renderCheckbox.bind(this))}
          </div>
        </div>
      </Modal>
    );
  }
}
