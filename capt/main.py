import os
import django
from scapy.all import *
from scapy.layers.inet import TCP, UDP
from scapy.layers.inet import IP
from scapy.layers.inet6 import IPv6
from scapy.layers.l2 import Ether, ARP
from django.utils import timezone

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pythonProject1.settings')

# Configure Django and initialize the application
django.setup()

from capt.models import Pckt, Endpoint

def parse_pcap(file_path):
    packets = rdpcap(file_path)

    unique_mac_addresses = set()  # Set to store unique MAC addresses

    for packet in packets:
        if ARP in packet:
            # Extract important information from ARP packet
            ip_src = packet[ARP].psrc
            ip_dst = packet[ARP].pdst
            mac_src = packet[ARP].hwsrc
            mac_dst = packet[ARP].hwdst
            protocol = "ARP"
            sport = None
            dport = None
        elif IPv6 in packet:
            # Extract important information from IPv6 packet
            if packet[IPv6].nh == 58:  # Protocol number for ICMPv6
                protocol = "ICMPv6"
                sport = None
                dport = None
            elif packet[IPv6].nh == 5353:  # Protocol number for MDNS
                protocol = "MDNS"
                sport = None
                dport = None
            else:
                protocol = "IPv6"
                sport = None
                dport = None
            if TCP in packet:
                sport = packet[TCP].sport
                dport = packet[TCP].dport
            elif UDP in packet:
                sport = packet[UDP].sport
                dport = packet[UDP].dport
        elif IP in packet:
            if packet.haslayer(Ether):
                # Extract important information from IP packet
                ip_src = packet[IP].src
                ip_dst = packet[IP].dst
                mac_src = packet.src
                mac_dst = packet.dst
                protocol = "IPv4"
                sport = None
                dport = None

                if TCP in packet:
                    sport = packet[TCP].sport
                    dport = packet[TCP].dport
                    protocol = "TCP"
                elif UDP in packet:
                    sport = packet[UDP].sport
                    dport = packet[UDP].dport
                    protocol = "UDP"
                else:
                    sport = None
                    dport = None
                    protocol = "Unknown"
        else:
            # Packet does not contain any recognized layers
            continue

        # Create a new Packets object and save it to the database
        Pckt.objects.create(
            timestamp=timezone.now(),
            ip_src=ip_src,
            ip_dst=ip_dst,
            mac_src=mac_src,
            mac_dst=mac_dst,
            protocol=protocol,
            sport=sport,
            dport=dport
        )

        # Add MAC address to the set of unique MAC addresses
        unique_mac_addresses.add(mac_src)

    # Create Endpoint objects for unique MAC addresses
    for mac_address in unique_mac_addresses:
        print(f"unique_mac_addresses")
        Endpoint.objects.get_or_create(mac_address=mac_address)

def print_packets():
    # Retrieve all Packets objects from the database
    packets = Pckt.objects.all()

    for packet in packets:
        print(f"IP src: {packet.ip_src}")
        print(f"IP dst: {packet.ip_dst}")
        print(f"MAC src: {packet.mac_src}")
        print(f"MAC dst: {packet.mac_dst}")
        print(f"Protocol: {packet.protocol}")
        print(f"Sport: {packet.sport}")
        print(f"Dport: {packet.dport}")
        print(f"*******************")

def print_endpoints():
    # Retrieve all Endpoint objects from the database
    endpoints = Endpoint.objects.all()

    for endpoint in endpoints:
        print(f"MAC address: {endpoint.mac_address}")

if __name__ == "__main__":
    # Parse the packet capture file
    pcap_file_path = r'C:\Users\Momed\Downloads\capture.pcap'
    #parse_pcap(pcap_file_path)

    # Print the Packets
    print_packets()

    # Print the Endpoints
    #print_endpoints()
