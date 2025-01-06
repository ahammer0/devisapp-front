import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import "./pages.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faCheck,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import MainTemplate from "../templates/MainTemplate";
import { selectUser, setUser } from "../../redux/userSlice";
import EditableText from "../atoms/EditableText";
import { editUser } from "../../api/userApi";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const user = useAppSelector(selectUser);
  const [userToSave, setUserToSave] = useState(user);
  const dispatch = useAppDispatch();

  const handleAbort = () => {
    setIsEditing(false);
    setUserToSave(user);
  };

  const handleSave = () => {
    setIsSaving(true);
  };

  useEffect(() => {
    if (isSaving) {
      if (!userToSave) return;
      editUser(userToSave)
        .then((res) => {
          dispatch(setUser({ user: res, role: "user" }));
          setIsEditing(false);
        })
        .catch(() => {
          setError("Probleme de sauvegarde");
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  }, [isSaving, dispatch, userToSave]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <MainTemplate>
      <h1>Profil entreprise</h1>
      {userToSave && (
        <>
          {!isEditing && (
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              Éditer <FontAwesomeIcon icon={faPen} />
            </button>
          )}
          {isEditing && (
            <>
              <button className="btn btn-secondary" onClick={handleAbort}>
                Annuler <FontAwesomeIcon icon={faArrowRotateLeft} />
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Valider <FontAwesomeIcon icon={faCheck} />
              </button>
            </>
          )}
          {isSaving && <p>Sauvegarde en cours...</p>}
          {error && <p className="text-danger">{error}</p>}
          <table className="profile">
            <tbody>
              <tr>
                <th>Email</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(email) =>
                      setUserToSave({ ...userToSave, email })
                    }
                    startValue={userToSave.email}
                  >
                    {userToSave.email}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Prénom</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(first_name) =>
                      setUserToSave({ ...userToSave, first_name })
                    }
                    startValue={userToSave.first_name}
                  >
                    {userToSave.first_name}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Nom</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(last_name) =>
                      setUserToSave({ ...userToSave, last_name })
                    }
                    startValue={userToSave.last_name}
                  >
                    {userToSave.last_name}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Nom de l'entreprise</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(company_name) =>
                      setUserToSave({ ...userToSave, company_name })
                    }
                    startValue={userToSave.company_name}
                  >
                    {userToSave.company_name}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Adresse</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(company_address) =>
                      setUserToSave({ ...userToSave, company_address })
                    }
                    startValue={userToSave.company_address}
                  >
                    {userToSave.company_address}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Siret</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(siret) =>
                      setUserToSave({ ...userToSave, siret })
                    }
                    startValue={userToSave.siret}
                  >
                    {userToSave.siret}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Ape</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(ape_code) =>
                      setUserToSave({ ...userToSave, ape_code })
                    }
                    startValue={userToSave.ape_code}
                  >
                    {userToSave.ape_code}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Rcs</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(rcs_code) =>
                      setUserToSave({ ...userToSave, rcs_code })
                    }
                    startValue={userToSave.rcs_code}
                  >
                    {userToSave.rcs_code}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Tva</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(tva_number) =>
                      setUserToSave({ ...userToSave, tva_number })
                    }
                    startValue={userToSave.tva_number}
                  >
                    {userToSave.tva_number}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(company_type) =>
                      setUserToSave({ ...userToSave, company_type })
                    }
                    startValue={userToSave.company_type}
                    type="select"
                    selectOptions={["SAS", "SARL", "Individuelle", "EURL"]}
                  >
                    {userToSave.company_type}
                  </EditableText>
                </td>
              </tr>
              <tr>
                <th>Statut du compte</th>
                <td>{userToSave.account_status}</td>
              </tr>
              <tr>
                <th>Plan d'abonnement</th>
                <td>{userToSave.subscription_plan}</td>
              </tr>
              <tr>
                <th>Date de création du compte</th>
                <td>{userToSave.created_at.toString()}</td>
              </tr>
              <tr>
                <th>Date d'expiration du compte</th>
                <td>{userToSave.expires_at.toString()}</td>
              </tr>
              <tr>
                <th>Informations complémentaires</th>
                <td>
                  <EditableText
                    isEditMode={isEditing}
                    onModeSwitch={(quote_infos) =>
                      setUserToSave({ ...userToSave, quote_infos })
                    }
                    startValue={userToSave.quote_infos}
                  >
                    {userToSave.quote_infos}
                  </EditableText>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </MainTemplate>
  );
};
export default Profile;
