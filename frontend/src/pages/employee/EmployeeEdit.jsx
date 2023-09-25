import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/employee/FormElements/Input";
import Popup from "../../components/PopUp";
import Button from "../../components/employee/FormElements/Button";
import Button2 from "../../components/employee/FormElements/Button2";
import LoadingSpinner from "../../components/Spinner";
import ErrorModal from "../../components/employee/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
} from "../../features/employee/validators";
import { useForm } from "../../features/employee/form-hook";
import { useHttpClient } from "../../features/employee/http-hook";

import AdminCheck from '../../components/auth/AdminCheck'
import EmpSideBar from '../../components/employee/EmpSideBar';
import Modal from "../../features/employee/Modal"


const EmployeeEdit = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEmployee, setLoadedEmployee] = useState();
  const [showDeleteConfirmModal, setDeleteShowConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setUpdateShowConfirmModal] = useState(false);
  const employeeID = useParams().employeeId;
  const navigate = useNavigate();

  const showDeleteWarningHandler = () => {
    setDeleteShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setDeleteShowConfirmModal(false);
  };

  const showUpdateWarningHandler = () => {
    setUpdateShowConfirmModal(true);
  };

  const cancelUpdateHandler = () => {
    setUpdateShowConfirmModal(false);
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      empid: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      nic: {
        value: "",
        isValid: false,
      },
    /*  type: {
        value: "",
        isValid: false,
      },*/
      email: {
        value: "",
        isValid: false,
      },
      contact: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      gender: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/employees/${employeeID}`
        );
        setLoadedEmployee(responseData.employee);
        setFormData(
          {
            empid: {
              value: responseData.employee.empid,
              isValid: true,
            },
            name: {
              value: responseData.employee.name,
              isValid: true,
            },
            nic: {
              value: responseData.employee.nic,
              isValid: true,
            },
            /*type: {
              value: responseData.employee.type,
              isValid: true,
            },*/
            email: {
              value: responseData.employee.email,
              isValid: false,
            },
            contact: {
              value: responseData.employee.contact,
              isValid: false,
            },
            address: {
              value: responseData.employee.address,
              isValid: false,
            },
            gender: {
              value: responseData.employee.name,
              isValid: true,
            },
            age: {
              value: responseData.employee.age,
              isValid: true,
            },
            password: {
              value: responseData.employee.password,
              isValid: true,
            },
          
          },
          true
        );
      } catch (err) {}
    };
    fetchEmployee();
  }, [sendRequest, employeeID, setFormData]);

  const employeeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/employees/${employeeID}`,
        "PATCH",
        JSON.stringify({
          empid: formState.inputs.empid.value,
          name: formState.inputs.name.value,
          nic: formState.inputs.nic.value,
          // type: formState.inputs.type.value,
          email: formState.inputs.email.value,
          contact: formState.inputs.contact.value,
          address: formState.inputs.address.value,
          gender: formState.inputs.gender.value,
          age: formState.inputs.age.value,
          
        }),
        {
          "Content-Type": "application/json",
        }
      );
      // history.push("/" + auth.userId + "/employees");
    } catch (err) {}
    navigate("/employeeDetails");
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/employees/${employeeID}`,
        'DELETE'
      );
    } catch (err) {}
    navigate("/employeeDetails");
  };

  
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
           <Modal
        show={showDeleteConfirmModal}//showDeleteConfirmModal
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={confirmDeleteHandler}>
              CONFIRM
            </Button>
            <Button2 onClick={cancelDeleteHandler}>
              CANCEL
            </Button2>
          </React.Fragment>
        }
        >
        <p>
          Do you want to proceed and delete this payment Record? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Modal
        show={showUpdateConfirmModal}
        onCancel={cancelUpdateHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={employeeUpdateSubmitHandler}>
              CONFIRM
            </Button>
            <Button2 onClick={cancelUpdateHandler}>
              CANCEL
            </Button2>
          </React.Fragment>
        }
        >
        <p>
          After confirmation, the update will success!
        </p>
      </Modal>
      <AdminCheck />
      <EmpSideBar>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {!isLoading && loadedEmployee && (<h2>Employee Details</h2>)}
      {!isLoading && loadedEmployee && (
        <form className="payment-form" onSubmit={employeeUpdateSubmitHandler}>
            <Input
           id="empid"
           element="input"
           type="text"
           label="Employee ID"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a valid empid."
           onInput={inputHandler}
            initialValue={loadedEmployee.empid}
            initialValid={true}
            disable={true}
            
          />
          <Input
           id="name"
           element="input"
           type="text"
           label="Name"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a valid Name."
           onInput={inputHandler}
            initialValue={loadedEmployee.name}
            initialValid={true}
            
          />
          <Input
            id="nic"
            element="input"
            type="text"
            label="NIC"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid nic number."
            onInput={inputHandler}
            initialValue={loadedEmployee.nic}
            initialValid={true}
            disable={true}
          />
          {/*}
            <Input
           id="type"
           element="input"
           type="text"
           label="type"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a valid type."
           onInput={inputHandler}
            initialValue={loadedEmployee.type}
            initialValid={true}
          
      />*/}
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            initialValue={loadedEmployee.email}
            initialValid={true}
          />
          
          <Input
            id="contact"
            element="input"
            type="number"
            label="Contact Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid number."
            onInput={inputHandler}
            initialValue={loadedEmployee.contact}
            initialValid={true}
          />
          <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Amount."
          onInput={inputHandler}
          initialValue={loadedEmployee.address}
          initialValid={true}
          />
            <Input
           id="gender"
           element="input"
           type="text"
           label="gender"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a valid gender."
           onInput={inputHandler}
            initialValue={loadedEmployee.gender}
            initialValid={true}
            disable={true}
            
          />
            <Input
           id="age"
           element="input"
           type="number"
           label="Age"
           validators={[VALIDATOR_REQUIRE()]}
           errorText="Please enter a valid age."
           onInput={inputHandler}
            initialValue={loadedEmployee.age}
            initialValid={true}
            
          />

        <div >
          <Button type="button" onClick={showUpdateWarningHandler} disabled={!formState.isValid}>
            UPDATE
          </Button>
          <Button2 type="button" onClick={showDeleteWarningHandler}>
            DELETE
          </Button2>
          </div>
        </form>
        
      )
      }
      

      
      
      
      </EmpSideBar>
    </React.Fragment>
  );
};

export default EmployeeEdit;
