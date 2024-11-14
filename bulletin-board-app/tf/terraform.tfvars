ami                         = "ami-0e252be8f4dfa2c0d"
cluster_name                = "bb-cluster"
container_image             = "sha256:52086e386e94c7b5c09581aad3eb0d3a96c03994c01056737a09b1b081a5f121"
container_port              = 8080
instance_name_prefix       = "cit262-node"
instance_type              = "t2.micro"
lab_role                    = "arn:aws:iam::YOUR_ACCOUNT_ID:role/LabRole" # Reemplaza con tu número de cuenta de AWS
region                      = "us-west-2"
vpc_cidr                    = "10.0.0.0/16"
vpc_prefix                  = "ecs-vpc"