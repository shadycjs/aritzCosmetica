import { useState, useEffect } from "react";
import BreadCrum from "../../components/BreadCrum/BreadCrum";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from "./MyAccount.module.css";
import { MdModeEdit } from "react-icons/md";
import Provinces from "../../data/Provinces.json";
import axiosInstance from "../../api/axiosConfig";
import { useSession } from "../../context/SessionContext";
function MyAccount() {
    const [editMode, setEditMode] = useState({
        account: false,
        personal: false,
        domicilio: false
    });
    const [account, setAccount] = useState([]);
    const [error, setError] = useState(null); // Estado para gestionar errores
    const { userId } = useSession();

    const toggleEditMode = (section) => {
        setEditMode(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    }

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axiosInstance.get(`Account/${userId}`); // Realiza una solicitud GET a /api/products
                setAccount(response.data); // Actualiza el estado con los datos obtenidos
                console.log('Cuenta:', response.data);
            } catch (err) {
                console.error("Error al obtener la cuenta", err); // Muestra el error en consola
                setError(err.message); // Guarda el mensaje de error en el estado
            }
        };

        fetchAccount();
    }, [userId]); 

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
                                      value={account.USR_EMAIL}
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
                                  <p>Email: {account.USR_EMAIL}</p>
                                  <p>Contrasenia: ***********</p>
                              </div>
                          }
                      </label>
                      {editMode.account ?
                          <div className={styles.containerBtns}> 
                              <input
                                  type="submit"
                                  value="Cancelar"
                                  className="btn btn-danger"
                                  onClick={() => toggleEditMode('account')}
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
                                      value={ account.USR_NAME ? account.USR_NAME : 'SIN CARGAR' }
                                  />
                                  <label to="apellido">Apellido:</label>
                                  <input
                                        type="text"
                                        placeholder="Apellido"
                                        name="apellido"
                                        value={account.USR_SURNAME ? account.USR_SURNAME : 'SIN CARGAR'}
                                  />
                                  <label to="documento">Documento:</label>
                                  <input
                                      type='number'
                                      placeholder="Documento"
                                      name="documento"
                                      value={account.USR_DOCUMENT_NUMBER ? account.USR_DOCUMENT_NUMBER : 0}
                                  />
                              </div>
                              :
                              <div className={styles.noEditContainer}>
                                  <p>Nombre: {account.USR_NAME ? account.USR_NAME : 'SIN CARGAR'}</p>
                                  <p>Apellido: {account.USR_SURNAME ? account.USR_SURNAME : 'SIN CARGAR'}</p>
                                  <p>Documento: {account.USR_DOCUMENT_NUMBER ? account.USR_DOCUMENT_NUMBER : 'SIN CARGAR'}</p>
                              </div>
                          }
                      </label>

                      {editMode.personal ?
                          <div className={styles.containerBtns}>
                              <input
                                  type="submit"
                                  value="Cancelar"
                                  className="btn btn-danger"
                                  onClick={() => toggleEditMode('personal')}
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
                                  <p>Provincia: {account.USR_PROVINCE ? account.USR_PROVINCE : 'SIN CARGAR'}</p>
                                  <p>Ciudad: {account.USR_CITY ? account.USR_CITY : 'SIN CARGAR'}</p>
                                  <p>Cod.Postal: {account.USR_POSTAL_CODE ? account.USR_POSTAL_CODE : 'SIN CARGAR'}</p>
                                  <p>Calle: {account.USR_STREET ? account.USR_STREET : 'SIN CARGAR'}</p>
                                  <p>Altura: {account.USR_STREET_NUMBER ? account.USR_STREET_NUMBER : 'SIN CARGAR'}</p>
                                  <p>Piso: {account.USR_FLOOR ? account.USR_FLOOR : 'SIN CARGAR'}</p>
                                  <p>Casa/Dpto: {account.USR_APARTMENT ? account.USR_APARTMENT : 'SIN CARGAR'}</p>
                              </div>
                          }
                      </label>

                      {editMode.domicilio ?
                          <div className={styles.containerBtns}>
                              <input
                                  type="submit"
                                  value="Cancelar"
                                  className="btn btn-danger"
                                  onClick={() => toggleEditMode('domicilio')}
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