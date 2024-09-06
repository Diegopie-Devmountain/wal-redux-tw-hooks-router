import { useState } from "react";

export default function UserDetailsButtons({isEditing, setIsEditing, handleSave}) {

  // console.log('re-render');

  return (
      <div className="flex justify-center gap-x-6 mt-4">
        {!isEditing && <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button>}
        {isEditing && <button className="btn-primary" onClick={handleSave}>Save</button>}
      </div>
  );
}