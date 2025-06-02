-- Crear tabla de permisos
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Crear tabla intermedia: roles <-> permisos
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Trigger para permisos nuevos asignados a admin
DELIMITER $$

CREATE TRIGGER assign_permission_to_admin
AFTER INSERT ON permissions
FOR EACH ROW
BEGIN
  DECLARE adminRoleId INT;

  -- Obtener el ID del rol admin
  SELECT id INTO adminRoleId FROM roles WHERE name = 'admin' LIMIT 1;

  -- Asignar el nuevo permiso al rol admin
  INSERT IGNORE INTO role_permissions (role_id, permission_id)
  VALUES (adminRoleId, NEW.id);
END$$

DELIMITER ;

-- Insertar nuevo role
INSERT IGNORE INTO roles (name) VALUES ('analyst');

-- Insertar acciones básicas
INSERT IGNORE INTO permissions (action, description) VALUES
('product:edit', 'Permite crear, actualizar o eliminar productos'),
('metrics:view', 'Permite ver panel de métricas');


-- Asignar permiso de métricas al rol "analyst"
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.action = 'metrics:view'
WHERE r.name = 'analyst';
