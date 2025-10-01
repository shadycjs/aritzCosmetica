import { useState } from "react";
import BreadCrum from "../../components/BreadCrum/BreadCrum";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from "./MyAccount.module.css";
import { MdModeEdit } from "react-icons/md";
function MyAccount() {
    const [upd, setUpd] = useState(false);

    const onChangeUpd = () => {
        setUpd(true);
    }

  return (
      <CenteredContainer>
          <BreadCrum />
          <div className={styles.container}>
              <div className={styles.datosCuentaContainer}>
                  <div className={styles.titleAndIcon }>
                    <h4>Datos de la cuenta</h4>
                      <MdModeEdit
                          className={styles.editIcon}
                          size={20}
                          onClick={onChangeUpd}
                      />
                  </div>
                  <div className={styles.datosCuenta}>
                      <label className={styles.labelEmailPassword}>
                          {upd ?
                              <div className={styles.labelEmailUpd}>
                                  <label>Email:</label>
                                  <input
                                      type="email"
                                      placeholder="Email"
                                      name="email"
                                  />
                              </div>
                              :
                              <p>Email: </p>
                          }
                      </label>
                      <label className={styles.labelEmailPassword}>
                          {upd ?
                              <div className={styles.labelEmailUpd}>
                                  <label to="password">Password:</label>
                                  <input
                                      type="password"
                                      placeholder="Password"
                                      name="password"
                                  />
                                  <label to="confirmPassword">Confirm Password:</label>
                                  <input
                                      type="password"
                                      placeholder="Confirm password"
                                      name="confirmPassword"
                                  />
                              </div>
                              :
                              <p>Contrasenia: </p>
                          }
                      </label>
                      {upd ?
                          <input
                              type="submit"
                              value="Actualizar"
                              className="btn btn-primary"
                          />
                          :
                          ''
                      }
                  </div>
              </div>
              <div className={styles.datosPersonalesContainer}>
                  <div className={styles.titleAndIcon}>
                      <h4>Datos personales</h4>
                      <MdModeEdit
                          className={styles.editIcon}
                          size={20}
                          onClick={onChangeUpd}
                      />

                  </div>
              </div>
              <div className={styles.domicilioContainer}>

              </div>
          </div>
      </CenteredContainer>
  );
}

export default MyAccount;