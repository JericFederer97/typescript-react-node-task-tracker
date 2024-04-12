import React, { createContext, FC, ReactElement, PropsWithChildren, useState } from 'react';

// * State value is that state is specific to a particular component, whereas context is available globally. 
// * Similar to useState, you would have a state and a set state function.
// * 'updated' is a state and 'toggle' is a set state function.
export const TaskStatusChangedContext = createContext({
    updated : false,
    toggle: () => {},
});

export const TaskStatusChangedContextProvider: FC<PropsWithChildren> = (
    props
): ReactElement => {
    const [updated, setUpdated] = useState(false);
    
    function toggleHandler() {
        updated ? setUpdated(false) : setUpdated(true);
    }

    return (
        <TaskStatusChangedContext.Provider
            // * Values that will available globally.
            value={{
                updated: updated,
                toggle: toggleHandler
            }}
        >
            {props.children}
        </TaskStatusChangedContext.Provider>
    )
};