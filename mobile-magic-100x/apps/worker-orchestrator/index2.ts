// the backend finds a free AWS machine for the user, and if there aren't enough free machines left, it tells AWS to create more
import express from "express";
import { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingInstancesCommand, TerminateInstanceInAutoScalingGroupCommand } from "@aws-sdk/client-auto-scaling";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2"


const app = express();

// client talk to auto scaling
const client = new AutoScalingClient({
    region: "ap-south-1", credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_ACCESS_SECRET!
    }
});

// ec2Client talks to instances
const ec2Client = new EC2Client({
    region: "ap-south-1", credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_ACCESS_SECRET!
    }
})

type Machine = {
    ip: string;
    isUsed: Boolean;
    assignedProject?: Boolean;
}
const ALL_MACHINES: Machine[] = [];

async function refreshInstances() {
    const command = new DescribeAutoScalingInstancesCommand(); // this creates a request
    const data = await client.send(command); // request send -> aws replies and gets stored in data

    const ec2InstanceCommand = new DescribeInstancesCommand({
        InstanceIds: data.AutoScalingInstances?.map(x => x.InstanceId!)
    });

    const ec2Response = await ec2Client.send(ec2InstanceCommand);
    console.log(JSON.stringify(ec2Response.Reservations?.[0]?.Instances?.[0]?.PublicDnsName));
}
refreshInstances();

setInterval(() => {
    refreshInstances();
}, 10 * 1000);

app.get("/:projectId", (req, res) => {
    const idleMachine = ALL_MACHINES.find(x => x.isUsed === false);
    if (!idleMachine) {
        res.status(404).send("No idle machine found");
        return;
    }
    idleMachine.isUsed = true;
    const command = new SetDesiredCapacityCommand({
        AutoScalingGroupName: "vscode-asg",
        DesiredCapacity: ALL_MACHINES.length + (5 - ALL_MACHINES.filter(x => x.isUsed === false).length),
    });

    client.send(command)
    res.send({
        ip: idleMachine.ip
    });
});

app.post("/destroy", (req, res) => {
    const machineId: string = req.body.machineId;

    const command = new TerminateInstanceInAutoScalingGroupCommand({
        InstanceId: machineId,
        ShouldDecrementDesiredCapacity: true
    });
    client.send(command);
})

app.listen(9092);