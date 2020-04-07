import React from 'react';
import PropTypes from 'prop-types';

export default function AddImg(props) {
  const { files } = props;

  const onRemove = (id) => {
    props.onRemove(id);
  };

  return (
    <React.Fragment>
      {files.map((item) => (
        <div key={item.id} className="item-img-div">
          <div className="close" onClick={() => onRemove(item.id)}>x</div>
          <img className="item-img" src={item.dataUrl} />
        </div>
      ))}
    </React.Fragment>
  );
}

AddImg.propTypes = {
  files: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};
