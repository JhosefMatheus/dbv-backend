import { Endpoint, Functionality, PrismaClient, Role } from "@prisma/client";
import * as CryptoJS from 'crypto-js';

const prisma = new PrismaClient();

async function createRoles(): Promise<void> {
  await prisma.$transaction([
    prisma.role.createMany({
      data: [
        {
          name: "Desbravador(a)",
          description: "Desbravador(a) do clube."
        },
        {
          name: "Conselheiro(a) Associado(a)",
          description: "Conselheiro(a) associado(a) do clube."
        },
        {
          name: "Conselheiro(a)",
          description: "Conselheiro(a) do clube."
        },
        {
          name: "Instrutor(a) Associado(a)",
          description: "Instrutor(a) associado(a) do clube."
        },
        {
          name: "Instrutor(a)",
          description: "Instrutor(a) do clube."
        },
        {
          name: "Tesoureiro(a) Associado(a)",
          description: "Tesoureiro(a) associado(a) do clube."
        },
        {
          name: "Tesoureiro(a)",
          description: "Tesoureiro(a) do clube."
        },
        {
          name: "Secretário(a) Associado(a)",
          description: "Secretário(a) associado(a) do clube."
        },
        {
          name: "Secretário(a)",
          description: "Secretário(a) do clube."
        },
        {
          name: "Diretor(a) Associado(a)",
          description: "Diretor(a) associado(a) do clube."
        },
        {
          name: "Diretor(a)",
          description: "Diretor(a) do clube."
        }
      ]
    })
  ]);
}

async function createFunctionalities(): Promise<void> {
  await prisma.$transaction([
    prisma.functionality.createMany({
      data: [
        {
          name: "Unidades",
          url: "/unities",
          description: "Página responsável por gerenciar as unidades do clube."
        }
      ]
    })
  ]);
}

async function linkRoleAndFunctionalities(): Promise<void> {
  const unitiesFunctionality: Functionality = await prisma.functionality.findFirstOrThrow({
    where: {
      name: "Unidades"
    }
  });

  const pathfinderRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Desbravador(a)"
    }
  });

  const associateAdivisorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Conselheiro(a) Associado(a)"
    }
  });

  const advisorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Conselheiro(a)"
    }
  });

  const associateInstructorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Instrutor(a) Associado(a)"
    }
  });

  const instructorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Instrutor(a)"
    }
  });

  const associateTreasurerRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Tesoureiro(a) Associado(a)"
    }
  });

  const treasurerRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Tesoureiro(a)"
    }
  });

  const associateSecretaryRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Secretário(a) Associado(a)"
    }
  });

  const secretaryRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Secretário(a)"
    }
  });

  const associateDirectorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Diretor(a) Associado(a)"
    }
  });

  const directorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Diretor(a)"
    }
  });

  await prisma.$transaction([
    prisma.roleFunctionality.createMany({
      data: [
        {
          roleId: directorRole.id,
          functionalityId: unitiesFunctionality.id
        },
        {
          roleId: associateDirectorRole.id,
          functionalityId: unitiesFunctionality.id
        },
        {
          roleId: secretaryRole.id,
          functionalityId: unitiesFunctionality.id
        },
        {
          roleId: associateSecretaryRole.id,
          functionalityId: unitiesFunctionality.id
        }
      ]
    })
  ]);
}

async function createUsers(): Promise<void> {
  await prisma.$transaction([
    prisma.user.create({
      data: {
        name: "Jhosef Matheus Medeiros Nobrega Artur do Nascimento",
        email: "jhosef.mat123@hotmail.com",
        password: CryptoJS.SHA256("Bambam@xx12").toString(),
        role: {
          connect: {
            name: "Diretor(a)"
          }
        }
      }
    })
  ]);
}

async function createEndpoints(): Promise<void> {
  await prisma.$transaction([
    prisma.endpoint.createMany({
      data: [
        {
          url: "/auth/sign-up",
          method: "POST",
          description: "Criar um novo usuário no sistema."
        }
      ]
    })
  ]);
}

async function linkRoleAndEndpoint(): Promise<void> {
  const signUpEndpoint: Endpoint = await prisma.endpoint.findFirstOrThrow({
    where: {
      url: "/auth/sign-up",
      method: "POST"
    }
  });

  const associateAdivisorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Conselheiro(a) Associado(a)"
    }
  });

  const advisorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Conselheiro(a)"
    }
  });

  const instructorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Instrutor(a)"
    }
  });

  const treasurerRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Tesoureiro(a)"
    }
  });

  const associateSecretaryRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Secretário(a) Associado(a)"
    }
  });

  const secretaryRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Secretário(a)"
    }
  });

  const associateDirectorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Diretor(a) Associado(a)"
    }
  });

  const directorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Diretor(a)"
    }
  });

  await prisma.$transaction([
    prisma.roleEndpoint.createMany({
      data: [
        {
          roleId: associateAdivisorRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: advisorRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: instructorRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: treasurerRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: associateSecretaryRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: secretaryRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: associateDirectorRole.id,
          endpointId: signUpEndpoint.id
        },
        {
          roleId: directorRole.id,
          endpointId: signUpEndpoint.id
        }
      ]
    })
  ]);
}

async function createRoleGrants(): Promise<void> {
  const pathfinderRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Desbravador(a)"
    }
  });

  const associateAdivisorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Conselheiro(a) Associado(a)"
    }
  });

  const advisorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Conselheiro(a)"
    }
  });

  const associateInstructorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Instrutor(a) Associado(a)"
    }
  });

  const instructorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Instrutor(a)"
    }
  });

  const associateTreasurerRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Tesoureiro(a) Associado(a)"
    }
  });

  const treasurerRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Tesoureiro(a)"
    }
  });

  const associateSecretaryRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Secretário(a) Associado(a)"
    }
  });

  const secretaryRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Secretário(a)"
    }
  });

  const associateDirectorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Diretor(a) Associado(a)"
    }
  });

  const directorRole: Role = await prisma.role.findFirstOrThrow({
    where: {
      name: "Diretor(a)"
    }
  });

  await prisma.$transaction([
    prisma.roleGrant.createMany({
      data: [
        {
          roleGrantingId: associateAdivisorRole.id,
          roleGrantedId: pathfinderRole.id
        },
        {
          roleGrantingId: advisorRole.id,
          roleGrantedId: associateAdivisorRole.id
        },
        {
          roleGrantingId: advisorRole.id,
          roleGrantedId: pathfinderRole.id
        },
        {
          roleGrantingId: instructorRole.id,
          roleGrantedId: associateInstructorRole.id
        },
        {
          roleGrantingId: treasurerRole.id,
          roleGrantedId: associateTreasurerRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: pathfinderRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: associateAdivisorRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: advisorRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: associateInstructorRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: instructorRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: associateTreasurerRole.id
        },
        {
          roleGrantingId: associateSecretaryRole.id,
          roleGrantedId: treasurerRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: pathfinderRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: associateAdivisorRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: advisorRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: associateInstructorRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: instructorRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: associateTreasurerRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: treasurerRole.id
        },
        {
          roleGrantingId: secretaryRole.id,
          roleGrantedId: associateSecretaryRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: pathfinderRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: associateAdivisorRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: advisorRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: associateInstructorRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: instructorRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: associateTreasurerRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: treasurerRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: associateSecretaryRole.id
        },
        {
          roleGrantingId: associateDirectorRole.id,
          roleGrantedId: secretaryRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: pathfinderRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: associateAdivisorRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: advisorRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: associateInstructorRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: instructorRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: associateTreasurerRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: treasurerRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: associateSecretaryRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: secretaryRole.id
        },
        {
          roleGrantingId: directorRole.id,
          roleGrantedId: associateDirectorRole.id
        }
      ]
    })
  ]);
}

async function main() {
  await createRoles();
  await createFunctionalities();
  await linkRoleAndFunctionalities();
  await createUsers();
  await createEndpoints();
  await linkRoleAndEndpoint();
  await createRoleGrants();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });