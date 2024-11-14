provider "aws" {
  region = "us-east-1"
}

# VPC Configuration (Si no tienes una VPC existente)
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

# Subnet Configuration
resource "aws_subnet" "main" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

# Security Group (Si lo necesitas para la instancia EC2)
resource "aws_security_group" "allow_ssh_http" {
  name        = "allow_ssh_http"
  description = "Allow SSH and HTTP traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance Configuration
resource "aws_instance" "docker_host" {
  ami                    = "ami-0f19a1cf9c1469fd6" # AMI ID proporcionada
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.main.id
  key_name               = "docker-host-key-pair" # Asegúrate de tener esta clave configurada
  associate_public_ip_address = true
  security_groups        = [aws_security_group.allow_ssh_http.name]
  
  tags = {
    Name = "docker-host"
  }

  # Con esta configuración, la instancia se detendría si se termina el ciclo
  lifecycle {
    prevent_destroy = true
  }
}

# Elástica IP (si deseas asociar una IP pública estática)
resource "aws_eip" "docker_host_eip" {
  instance = aws_instance.docker_host.id
}

# IAM Role para la instancia EC2 (si usas ECS o interactúas con otros servicios AWS)
resource "aws_iam_role" "ecs_instance_role" {
  name               = "ecs_instance_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance_policy_attach" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerServiceforEC2Role"
}

# Auto Scaling Group (Si usas Auto Scaling)
resource "aws_autoscaling_group" "asg" {
  desired_capacity     = 1
  max_size             = 2
  min_size             = 1
  vpc_zone_identifier  = [aws_subnet.main.id]
  health_check_type    = "EC2"
  health_check_grace_period = 300

  launch_configuration {
    instance_type        = "t2.micro"
    ami                  = "ami-0f19a1cf9c1469fd6"
    key_name             = "docker-host-key-pair"
    security_groups      = [aws_security_group.allow_ssh_http.name]
  }
}
