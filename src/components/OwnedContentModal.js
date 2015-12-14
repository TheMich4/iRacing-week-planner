import React, { Component, PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import update from 'react-addons-update';
import Modal from './modal/Modal';
import Checkbox from './Checkbox';

const fixText = (text) => (decodeURIComponent(text).replace(/\+/g, ' '));

export default class OwnedContentModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    save: PropTypes.func,
    content: PropTypes.array,
    ownedContent: PropTypes.array,
    idField: PropTypes.string
  }

  static defaultProps = {
    onClose: () => {},
    save: () => {},
    content: [],
    ownedContent: [],
    idField: 'sku'
  }

  setCheckboxContent(id, e) {
    const {ownedContent, save} = this.props;
    const newOwned = cloneDeep(ownedContent);
    const index = newOwned.indexOf(id);

    if (index === -1 && e.target.checked) {
      newOwned.push(id);
    }
    if (index !== -1 && e.target.checked === false) {
      newOwned.splice(index, 1);
    }
    save(newOwned);
  }

  render() {
    const {onClose, content, ownedContent, save, idField} = this.props;
    return (
      <Modal onClose={onClose} title='Choose owned content' doneAction={onClose}>
        <div className="container-fluid">
          <div className="row">
            {content.map((item, index) => {
              return (
                <div className="col-xs-6" key={index}>
                  <Checkbox checked={ownedContent.indexOf(item[idField]) !== -1}
                    onChange={this.setCheckboxContent.bind(this, item[idField])}>{fixText(item.skuname)}</Checkbox>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    );
  }
}
