import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DynamicModuleLoader } from "redux-dynamic-modules-react";

export const DynamicModule = ({
  MODULE_KEY,
  ModuleRootComponent,
  ModuleRootReducer,
  ModuleRootSaga,
  onLoadActions,
  onUnloadActions,
  onMountActions,
  onDismountActions,
  children,
  ...props
}) => {
  const moduleConfig = {
    id: MODULE_KEY,
    reducerMap: {
      [MODULE_KEY]: ModuleRootReducer
    },
    sagas: [ModuleRootSaga],
    initialActions: onLoadActions,
    finalActions: onUnloadActions
  };

  return (
    <DynamicModuleLoader strictMode={true} modules={[moduleConfig]}>
      <MountHookWrapper
        onMountActions={onMountActions}
        onDismountActions={onDismountActions}
      >
        <ModuleRootComponent {...props}>{children}</ModuleRootComponent>
      </MountHookWrapper>
    </DynamicModuleLoader>
  );
};

const MountHookWrapper = ({ onMountActions, onDismountActions, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(onMountActions)) {
      onMountActions.forEach(dispatch);
    }

    if (Array.isArray(onDismountActions)) {
      return () => onDismountActions.forEach(dispatch);
    }
  }, [onMountActions, onDismountActions, dispatch]);

  return <>{children}</>;
};
