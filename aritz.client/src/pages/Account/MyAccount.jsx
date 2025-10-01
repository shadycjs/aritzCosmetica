import { useState } from "react";
import BreadCrum from "../../components/BreadCrum/BreadCrum";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from "./MyAccount.module.css";
import { MdModeEdit } from "react-icons/md";
import Provinces from "../../data/Provinces.json";
function MyAccount() {
    const [editMode, setEditMode] = useState({
        account: false,
        personal: false,
        domicilio: false
    });

    const toggleEditMode = (section) => {
        setEditMode(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
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
                          onClick={() => toggleEditMode('account')}
                      />
                  </div>
                  <div className={styles.datosCuenta}>
                      <label className={styles.labelEmailPassword}>
                          {editMode.account ?
                              <div className={styles.labelEmailUpd}>
                                  <label to="email">Email:</label>
                                  <input
                                      type="email"
                                      placeholder="Email"
                                      name="email"
                                  />
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
                              <div className={styles.noEditContainer}>
                                <p>Email: </p>
                                <p>Contrasenia: </p>
                              </div>
                          }
                      </label>
                      {editMode.account ?
                          <div className={styles.containerBtns}> 
                              <input
                                  type="submit"
                                  value="Cancelar"
                                  className="btn btn-danger"
                              />
                              <input
                                  type="submit"
                                  value="Actualizar"
                                  className="btn btn-primary"
                                  />
                          </div>
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
                          onClick={() => toggleEditMode('personal')}
                      />
                  </div>
                  <div className={styles.datosCuenta}>
                      <label className={styles.labelEmailPassword}>
                          {editMode.personal ?
                              <div className={styles.labelEmailUpd}>
                                  <label to="nombre">Nombre:</label>
                                  <input
                                      type="text"
                                      placeholder="Nombre"
                                      name="nombre"
                                  />
                                  <label to="apellido">Apellido:</label>
                                  <input
                                        type="text"
                                        placeholder="Apellido"
                                        name="apellido"
                                  />
                                  <label to="documento">Documento:</label>
                                  <input
                                      type="number"
                                      placeholder="Documento"
                                      name="documento"
                                  />
                              </div>
                              :
                              <div className={styles.noEditContainer}>
                                  <p>Nombre: </p>
                                  <p>Apellido: </p>
                                  <p>Documento: </p>
                              </div>
                          }
                      </label>

                      {editMode.personal ?
                          <div className={styles.containerBtns}>
                              <input
                                  type="submit"
                                  value="Cancelar"
                                  className="btn btn-danger"
                              />
                              <input
                                  type="submit"
                                  value="Actualizar"
                                  className="btn btn-primary"
                              />
                          </div>
                          :
                          ''
                      }
                  </div>
              </div>
              <div className={styles.domicilioContainer}>
                  <div className={styles.titleAndIcon}>
                      <h4>Domicilio</h4>
                      <MdModeEdit
                          className={styles.editIcon}
                          size={20}
                          onClick={() => toggleEditMode('domicilio')}
                      />
                  </div>
                  <div className={styles.datosCuenta}>
                      <label className={styles.labelEmailPassword}>
                          {editMode.domicilio ?
                              <div className={styles.labelEmailUpd}>
                                  <label to="provincia">Provincia:</label>
                                  <select
                                      className={styles.shippingInputs}
                                      name="provincia"
                                      id="provincia"
                                  >
                                      <option value="">Selecciona una provincia</option>
                                      {Provinces.map((provincia) => (
                                          <option key={provincia} value={provincia}>
                                              {provincia}
                                          </option>
                                      ))}
                                  </select>
                                  <label to="ciudad">Ciudad:</label>
                                  <input
                                      type="text"
                                      placeholder="Ciudad"
                                      name="ciudad"
                                  />
                                  <label to="codpostal">Codigo Postal:</label>
                                  <input
                                      type="number"
                                      placeholder="Codigo Postal"
                                      name="codpostal"
                                  />
                                  <label to="calle">Calle:</label>
                                  <input
                                      type="text"
                                      placeholder="Calle"
                                      name="calle"
                                  />
                                  <label to="altura">Altura:</label>
                                  <input
                                      type="number"
                                      placeholder="Altura"
                                      name="altura"
                                  />
                                  <label to="piso">Piso:</label>
                                  <input
                                      type="number"
                                      placeholder="Piso"
                                      name="piso"
                                  />
                                  <label to="casa">Casa/Dpto:</label>
                                  <input
                                      type="number"
                                      placeholder="Casa/Dpto"
                                      name="casa"
                                  />
                              </div>
                              :
                              <div className={styles.noEditContainer}>
                                  <p>Provincia: </p>
                                  <p>Ciudad: </p>
                                  <p>Cod.Postal: </p>
                                  <p>Calle: </p>
                                  <p>Altura: </p>
                                  <p>Piso: </p>
                                  <p>Casa/Dpto: </p>
                              </div>
                          }
                      </label>

                      {editMode.domicilio ?
                          <div className={styles.containerBtns}>
                              <input
                                  type="submit"
                                  value="Cancelar"
                                  className="btn btn-danger"
                              />
                              <input
                                  type="submit"
                                  value="Actualizar"
                                  className="btn btn-primary"
                              />
                          </div>
                          :
                          ''
                      }
                  </div>
              </div>
          </div>
      </CenteredContainer>
  );
}

export default MyAccount;