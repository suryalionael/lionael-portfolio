"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { isRoleId, roleById, type Role, type RoleId } from "@/lib/roles";
import { report } from "@/lib/analytics";

type RoleState = {
  /** null = the general view. */
  role: Role | null;
  setRole: (id: RoleId | null) => void;
};

const RoleContext = createContext<RoleState>({ role: null, setRole: () => {} });

export function useRole() {
  return useContext(RoleContext);
}

// Role is client-side state (URL ?role= + localStorage) so every page stays
// static. A shared link with ?role=ml loads already tailored.
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [roleId, setRoleId] = useState<RoleId | null>(null);

  // URL and localStorage only exist client-side; reading them post-mount
  // keeps the page static and hydration clean.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("role");
    if (isRoleId(fromUrl)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoleId(fromUrl);
      try {
        localStorage.setItem("role", fromUrl);
      } catch {}
      return;
    }
    try {
      const stored = localStorage.getItem("role");
      if (isRoleId(stored)) setRoleId(stored);
    } catch {}
  }, []);

  const setRole = useCallback((id: RoleId | null) => {
    setRoleId(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("role", id);
    else url.searchParams.delete("role");
    history.replaceState(history.state, "", url);
    try {
      if (id) localStorage.setItem("role", id);
      else localStorage.removeItem("role");
    } catch {}
    if (id) report("role_select", { role: id });
  }, []);

  return (
    <RoleContext.Provider
      value={{ role: roleId ? (roleById.get(roleId) ?? null) : null, setRole }}
    >
      {children}
    </RoleContext.Provider>
  );
}
