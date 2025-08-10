import styles from './CenteredContainer.module.css'
import PropTypes from 'prop-types'

function CenteredContainer({ children }) {
    return (
        <div className={styles.container}>
          {children}
      </div>
  );
}

CenteredContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CenteredContainer;