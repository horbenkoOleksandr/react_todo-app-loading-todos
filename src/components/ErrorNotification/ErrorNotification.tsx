import React from "react";

type Props = {
  messages: string[]
  hidden?: boolean
  onClose: () => void
}

export const ErrorNotification: React.FC<Props> = ({messages, hidden = true, onClose}) => {
  {
    /* DON'T use conditional rendering to hide the notification */
  }
  {
    /* Add the 'hidden' class to hide the message smoothly */
  }
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${hidden ? "hidden" : ""}`}
    >
      <button 
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          {message}
          <br />
        </React.Fragment>
      ))}
      {/* Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo */}
    </div>
  );
};
