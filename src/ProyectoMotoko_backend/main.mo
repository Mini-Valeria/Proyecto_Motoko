import Array "mo:base/Array";

actor PATIENTS{

type Paciente  = {
  id : Nat;
  nombre : Text;
  desc : Text;
  dias : Nat;
};

var pacientes : [Paciente] = [{
    id = 15;
    nombre = "Pablo Sánchez";
    desc = "Fractura en el brazo derecho y pierna derecha";
    dias = 2;
  }];

public func addp (dias : Nat, nombre : Text, desc : Text) : async Bool {
  let newId  = Array.size(pacientes) +1;
  let newp = {
    id = newId;
    nombre = nombre;
    desc = desc;
    dias = dias;
  };
  pacientes := Array.append<Paciente> (pacientes, [newp]);
return true;
};

public func mostp() : async [Paciente] {
return pacientes;
};

public func buscid (id : Nat) : async ?Paciente {
  return Array.find<Paciente> (pacientes, func(p) {p.id == id})
};

public func actp (id : Nat, nombre : Text, desc : Text, dias : Nat) : async Bool {
  let ptoupdate = Array.find<Paciente>(pacientes, func (pac) {pac.id == id});
  
  switch(ptoupdate) {
    case(null) {return false};
    case(?ptoupdate) { 
     let updatp ={
       id = id;
       nombre = nombre;
       desc = desc;
       dias = dias;
     };
     pacientes := Array.map<Paciente, Paciente> (pacientes, func (pat) { if (pat.id == id) {updatp} else {pat}});
  return true
    };
  };
};

  public func deletePatient(id : Nat) : async Bool {
    let paciente = Array.find<Paciente> (pacientes, func(p) { p.id == id });
    if (paciente != null) {
      pacientes := Array.filter<Paciente> (pacientes, func(p) {p.id != id});
      return true;
    } else {
        return false;
      };
  };

};