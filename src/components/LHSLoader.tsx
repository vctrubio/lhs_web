import React from 'react';
import styles from '@/styles/LHSLoader.module.css';

const LHSLoader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} style={{ height: '100vh' }}>
      <div className={styles.loader}>
        <span className={styles.letter}>L</span>
        <span className={styles.letter}>H</span>
        <span className={styles.letter}>S</span>
      </div>
    </div>
  );
};

export default LHSLoader;
